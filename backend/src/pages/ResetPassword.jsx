import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import { resetPassword } from "../services/api";
import FlickerText from "../components/FlickerText";


function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  // =========================================================
  // HANDLE RESET PASSWORD
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(
        token,
        newPassword
      );

      setSuccess(true);

      toast.success(
        "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1800);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      toast.error(
        error?.response?.data?.detail ||
          "Unable to reset password."
      );

      setSuccess(false);

    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <motion.div
        className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]"
        animate={{
          x: [0, -100, 0],
          y: [0, -70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* =====================================================
          GRID
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px]" />


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md"
        >

          {/* =================================================
              BACK TO LOGIN
          ================================================= */}

          <Link
            to="/login"
            className="font-body mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>


          {/* =================================================
              CARD
          ================================================= */}

          <motion.div
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-7">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <LockKeyhole className="h-5 w-5 text-cyan-300" />
              </div>

              <h1 className="font-display text-2xl">
                <FlickerText>
                  Create new password
                </FlickerText>
              </h1>

              <p className="font-body mt-2 text-sm leading-6 text-slate-400">
                Enter a new password for your
                TaskFlow account.
              </p>

            </div>


            {/* =================================================
                MISSING TOKEN
            ================================================= */}

            {!token && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4"
              >

                <p className="font-body text-sm text-red-300">
                  This password reset link is
                  invalid or incomplete.
                </p>

                <Link
                  to="/forgot-password"
                  className="font-body mt-3 inline-block text-xs text-slate-400 transition hover:text-cyan-300"
                >
                  Request a new reset link
                </Link>

              </motion.div>
            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] p-5 text-center"
              >

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                  <CheckCircle2 className="h-6 w-6 text-cyan-300" />
                </div>

                <h2 className="font-display text-lg">
                  Password updated
                </h2>

                <p className="font-body mt-2 text-sm text-slate-400">
                  Your password has been changed
                  successfully.
                </p>

                <p className="font-body mt-3 text-xs text-slate-500">
                  Redirecting you to login...
                </p>

              </motion.div>
            )}


            {/* =================================================
                RESET FORM
            ================================================= */}

            {token && !success && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* New Password */}

                <div>

                  <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                    New password
                  </label>

                  <div className="relative">

                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                    <input
                      type="password"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(
                          event.target.value
                        )
                      }
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      required
                      className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                    />

                  </div>

                  <p className="font-body mt-2 text-xs text-slate-600">
                    Minimum 8 characters
                  </p>

                </div>


                {/* Confirm Password */}

                <div>

                  <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                    Confirm password
                  </label>

                  <div className="relative">

                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      required
                      className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                    />

                  </div>

                </div>


                {/* Submit */}

                <motion.button
                  whileHover={{
                    scale: loading
                      ? 1
                      : 1.015,
                  }}
                  whileTap={{
                    scale: loading
                      ? 1
                      : 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="font-body flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading
                    ? "Updating password..."
                    : "Update password"}

                </motion.button>

              </form>
            )}

          </motion.div>

        </motion.section>

      </div>

    </main>
  );
}

export default ResetPassword;