import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/api";
import FlickerText from "../components/FlickerText";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(form);

      toast.success(data.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        "Unable to create your account.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Animated background */}

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

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="w-full max-w-md"
        >

          {/* Brand */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-8 text-center"
          >

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <Sparkles className="h-6 w-6 text-cyan-300" />
            </div>

            {/* TASKFLOW — Flicker & Noise */}

            <h1 className="font-display text-3xl tracking-wide">
              <FlickerText>
                TASKFLOW
              </FlickerText>
            </h1>

            <p className="font-body mt-3 text-sm text-cyan-300">
              Start organizing your work.
            </p>

          </motion.div>

          {/* Card */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
          >

            <div className="mb-7">

              {/* Create your account — Flicker & Noise */}

              <h2 className="font-display text-xl">
                <FlickerText>
                  Create your account
                </FlickerText>
              </h2>

              <p className="font-body mt-2 text-sm text-slate-400">
                Set up your workspace in a few seconds.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>
                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Full name
                </label>

                <div className="relative">

                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                  />

                </div>
              </div>

              {/* Email */}

              <div>
                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                  />

                </div>
              </div>

              {/* Password */}

              <div>
                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                  />

                </div>
              </div>

              {/* Terms */}

              <label className="font-body flex items-center gap-2 text-xs text-slate-500">

                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-white/10 bg-black/20"
                />

                <span>
                  I agree to the terms and conditions.
                </span>

              </label>

              {/* Submit */}

              <motion.button
                whileHover={{
                  scale: loading ? 1 : 1.015,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
                disabled={loading}
                type="submit"
                className="font-body group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent"
                    />

                    {/* Creating account — Flicker & Noise */}

                    <FlickerText>
                      Creating account...
                    </FlickerText>
                  </>
                ) : (
                  <>
                    {/* Create account — Flicker & Noise */}

                    <FlickerText>
                      Create account
                    </FlickerText>

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}

              </motion.button>

            </form>

            {/* Success indicator */}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">

              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />

              Your account is securely protected.

            </div>

          </motion.section>

          {/* Login */}

          <p className="font-body mt-7 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-white transition hover:text-cyan-300"
            >
              Sign in
            </Link>

          </p>

        </motion.div>

      </div>

    </main>
  );
}

export default Register;