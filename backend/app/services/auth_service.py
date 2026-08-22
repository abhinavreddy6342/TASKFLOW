from datetime import datetime, timedelta
import secrets

from sqlalchemy.orm import Session

from app.models.user import User
from app.utils.security import hash_password


# =========================================================
# PASSWORD RESET SETTINGS
# =========================================================

RESET_TOKEN_EXPIRATION_MINUTES = 15


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

    Returns:
        token string if user exists
        None if user does not exist
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

    # Token expires after 15 minutes.
    expires_at = (
        datetime.utcnow()
        + timedelta(
            minutes=RESET_TOKEN_EXPIRATION_MINUTES
        )
    )

    user.reset_token = token
    user.reset_token_expires = expires_at

    db.commit()
    db.refresh(user)

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

    user = (
        db.query(User)
        .filter(User.reset_token == token.strip())
        .first()
    )

    # Token does not exist.
    if not user:
        return False, "Invalid or expired reset token."

    # Token has expired.
    if (
        not user.reset_token_expires
        or user.reset_token_expires < datetime.utcnow()
    ):
        user.reset_token = None
        user.reset_token_expires = None

        db.commit()

        return False, "Invalid or expired reset token."

    # Update password.
    user.hashed_password = hash_password(
        new_password
    )

    # Invalidate the token immediately after use.
    user.reset_token = None
    user.reset_token_expires = None

    db.commit()
    db.refresh(user)

    return True, "Password reset successfully."