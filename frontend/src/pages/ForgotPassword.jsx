import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  KeyRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  forgotPassword,
} from "../services/api";

import FlickerText from "../components/FlickerText";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await forgotPassword(
          email.trim()
        );

      toast.success(
        "Reset request processed."
      );

      if (response.reset_token) {
        setResetToken(
          response.reset_token
        );
      }

    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      toast.error(
        error?.response?.data?.detail ||
          "Unable to process reset request."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Ambient glow */}

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

      {/* Grid */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px]" />


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

          {/* Back */}

          <Link
            to="/login"
            className="font-body mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>


          {/* Card */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">

            <div className="mb-7">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <KeyRound className="h-5 w-5 text-cyan-300" />
              </div>

              <h1 className="font-display text-2xl">
                <FlickerText>
                  Forgot password?
                </FlickerText>
              </h1>

              <p className="font-body mt-2 text-sm leading-6 text-slate-400">
                Enter your email address and
                we'll generate a secure password
                reset token.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    required
                    className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                  />

                </div>

              </div>


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
                className="font-body flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading
                  ? "Generating..."
                  : "Generate reset token"}

              </motion.button>

            </form>


            {/* Development token */}

            {resetToken && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-400/[0.06] p-4"
              >

                <p className="font-body text-xs uppercase tracking-wider text-yellow-300">
                  Development reset token
                </p>

                <p className="font-body mt-2 break-all text-xs leading-5 text-slate-300">
                  {resetToken}
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/reset-password?token=${encodeURIComponent(
                        resetToken
                      )}`
                    )
                  }
                  className="font-body mt-4 w-full rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-4 py-2.5 text-xs text-yellow-300 transition hover:border-yellow-400/40 hover:bg-yellow-400/20"
                >
                  Continue to reset password
                </button>

              </motion.div>
            )}

          </div>

        </motion.section>

      </div>

    </main>
  );
}

export default ForgotPassword;