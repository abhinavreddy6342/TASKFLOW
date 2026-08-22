from pydantic import BaseModel, EmailStr


# =========================================================
# REGISTER
# =========================================================

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


# =========================================================
# LOGIN
# =========================================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# =========================================================
# AUTH RESPONSE
# =========================================================

class AuthResponse(BaseModel):
    message: str
    access_token: str
    token_type: str = "bearer"


# =========================================================
# FORGOT PASSWORD
# =========================================================

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ForgotPasswordResponse(BaseModel):
    message: str
    reset_token: str | None = None


# =========================================================
# RESET PASSWORD
# =========================================================

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str