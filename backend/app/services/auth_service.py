from datetime import datetime, timedelta, timezone
import hashlib
import secrets

from sqlalchemy.orm import Session

from app.models.user import User
from app.utils.security import hash_password


# =========================================================
# PASSWORD RESET SETTINGS
# =========================================================

RESET_TOKEN_EXPIRATION_MINUTES = 15


# =========================================================
# TOKEN HASHING
# =========================================================

def hash_reset_token(token: str) -> str:
    """
    Hash a password-reset token before storing it in the database.
    """
    return hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()


# =========================================================
# CREATE PASSWORD RESET TOKEN
# =========================================================

def create_password_reset_token(
    db: Session,
    email: str,
):
    """
    Find the user by email and create a secure,
    time-limited password reset token.

    The raw token is returned to the caller so it can
    be delivered through a secure email service.

    Only the SHA-256 hash is stored in the database.
    """

    normalized_email = email.strip().lower()

    user = (
        db.query(User)
        .filter(User.email == normalized_email)
        .first()
    )

    if not user:
        return None

    # Generate a cryptographically secure token.
    token = secrets.token_urlsafe(32)

    # Store only the hash in the database.
    token_hash = hash_reset_token(token)

    # Token expires after 15 minutes.
    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=RESET_TOKEN_EXPIRATION_MINUTES
        )
    )

    user.reset_token = token_hash
    user.reset_token_expires = expires_at

    db.commit()

    return token


# =========================================================
# RESET PASSWORD
# =========================================================

def reset_password(
    db: Session,
    token: str,
    new_password: str,
):
    """
    Validate the reset token and change the user's password.

    Returns:
        (True, success message)
        (False, error message)
    """

    if not token or not token.strip():
        return False, "Reset token is required."

    # Hash the supplied token before database lookup.
    token_hash = hash_reset_token(
        token.strip()
    )

    user = (
        db.query(User)
        .filter(User.reset_token == token_hash)
        .first()
    )

    # Token does not exist.
    if not user:
        return False, "Invalid or expired reset token."

    # Token has expired.
    if (
        not user.reset_token_expires
        or user.reset_token_expires
        < datetime.now(timezone.utc)
    ):
        user.reset_token = None
        user.reset_token_expires = None

        db.commit()

        return False, "Invalid or expired reset token."

    # Update password.
    user.hashed_password = hash_password(
        new_password
    )

    # Invalidate token immediately after use.
    user.reset_token = None
    user.reset_token_expires = None

    db.commit()

    return True, "Password reset successfully."