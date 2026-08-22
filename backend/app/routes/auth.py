from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
)

from app.services.auth_service import (
    create_password_reset_token,
    reset_password,
)

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# =========================================================
# REGISTER
# =========================================================

@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists.",
        )

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
        }
    )

    return {
        "message": "Account created successfully.",
        "access_token": token,
        "token_type": "bearer",
    }


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/login",
    response_model=AuthResponse,
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if not user or not verify_password(
        data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
        }
    )

    return {
        "message": "Login successful.",
        "access_token": token,
        "token_type": "bearer",
    }


# =========================================================
# FORGOT PASSWORD
# =========================================================

@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse,
)
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    reset_token = create_password_reset_token(
        db,
        data.email,
    )

    # Development mode:
    # Return the reset token directly so the
    # complete password-reset flow can be tested.
    #
    # In production, this token should be sent
    # through an email instead.

    if not reset_token:
        return {
            "message": (
                "If an account exists with this email, "
                "a password reset link has been generated."
            ),
            "reset_token": None,
        }

    return {
        "message": "Password reset token generated successfully.",
        "reset_token": reset_token,
    }


# =========================================================
# RESET PASSWORD
# =========================================================

@router.post(
    "/reset-password",
)
def reset_password_endpoint(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    # Basic password validation
    if len(data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters.",
        )

    success, message = reset_password(
        db,
        data.token,
        data.new_password,
    )

    if not success:
        raise HTTPException(
            status_code=400,
            detail=message,
        )

    return {
        "message": message,
    }