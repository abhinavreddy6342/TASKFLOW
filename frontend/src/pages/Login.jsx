import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/api";
import FlickerText from "../components/FlickerText";

/* ========================================================= */
/* CYBER PARTICLE BACKGROUND                                  */
/* ========================================================= */

function CyberBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 12,
      drift: Math.random() * 100 - 50,
      opacity: Math.random() * 0.45 + 0.15,
      type: index % 5 === 0 ? "line" : "dot",
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* CYAN AMBIENT GLOW */}

      <motion.div
        className="absolute -left-48 -top-48 h-[550px] w-[550px] rounded-full bg-cyan-500/[0.08] blur-[140px]"
        animate={{
          x: [0, 90, 0],
          y: [0, 70, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* VIOLET AMBIENT GLOW */}

      <motion.div
        className="absolute -bottom-48 -right-48 h-[550px] w-[550px] rounded-full bg-violet-500/[0.08] blur-[140px]"
        animate={{
          x: [0, -90, 0],
          y: [0, -70, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CENTER CYAN GLOW */}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.025] blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* CYBER PARTICLES */}

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={
            particle.type === "line"
              ? "absolute rounded-full bg-cyan-300/30"
              : "absolute rounded-full bg-cyan-300"
          }
          style={{
            left: `${particle.left}%`,
            top: "-30px",

            width:
              particle.type === "line"
                ? "1px"
                : `${particle.size}px`,

            height:
              particle.type === "line"
                ? `${particle.size * 7}px`
                : `${particle.size}px`,

            opacity: particle.opacity,

            boxShadow:
              particle.type === "dot"
                ? "0 0 8px rgba(34,211,238,0.55)"
                : "0 0 8px rgba(34,211,238,0.25)",
          }}
          animate={{
            y: ["0vh", "115vh"],

            x: [
              0,
              particle.drift,
              particle.drift / 2,
              0,
            ],

            opacity: [
              0,
              particle.opacity,
              particle.opacity * 0.7,
              0,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.7, 1],
          }}
        />
      ))}

      {/* HORIZONTAL DIGITAL SCAN LINE */}

      <motion.div
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
        animate={{
          top: ["-5%", "105%"],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* SECOND SCAN LINE */}

      <motion.div
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-400/[0.08] to-transparent"
        animate={{
          top: ["110%", "-10%"],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />

      {/* DIGITAL GRID */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* VERTICAL CYBER LIGHT */}

      <motion.div
        className="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/[0.06] to-transparent"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-400/[0.05] to-transparent"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

    </div>
  );
}


/* ========================================================= */
/* CYBER CORNERS                                             */
/* ========================================================= */

function CyberCorners() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[-2px_-2px_12px_rgba(34,211,238,0.7)]" />

      <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[2px_-2px_12px_rgba(34,211,238,0.7)]" />

      <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[-2px_2px_12px_rgba(139,92,246,0.7)]" />

      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[2px_2px_12px_rgba(139,92,246,0.7)]" />
    </>
  );
}


/* ========================================================= */
/* LOGIN                                                     */
/* ========================================================= */

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  /* ======================================================= */
  /* HANDLE INPUT                                             */
  /* ======================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* ======================================================= */
  /* HANDLE LOGIN                                             */
  /* ======================================================= */

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess(true);

      toast.success("Login successful.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Invalid email or password.";

      toast.error(message);

      setSuccess(false);

    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* ANIMATED BACKGROUND */}

      <CyberBackground />


      {/* MAIN CONTENT */}

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

          {/* BRAND */}

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
              delay: 0.1,
              duration: 0.5,
            }}
            className="mb-9 text-center"
          >

            {/* Logo */}

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34,211,238,0)",
                  "0 0 25px rgba(34,211,238,0.18)",
                  "0 0 0px rgba(34,211,238,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="group relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/[0.04] backdrop-blur-xl"
            >

              <CyberCorners />

              <Sparkles className="relative z-10 h-6 w-6 text-cyan-300" />

            </motion.div>


            {/* TASKFLOW */}

            <h1 className="font-display text-3xl tracking-wide">
              <FlickerText>
                TASKFLOW
              </FlickerText>
            </h1>


            <p className="font-body mt-3 text-sm text-slate-400">
              Organize your work. Stay focused.
            </p>

          </motion.div>


          {/* LOGIN CARD */}

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
              delay: 0.2,
              duration: 0.6,
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
          >

            <CyberCorners />

            {/* Card top glow */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />


            <div className="relative z-10">

              {/* CARD HEADER */}

              <div className="mb-7">

                <h2 className="font-display text-xl">
                  <FlickerText>
                    Welcome back
                  </FlickerText>
                </h2>

                <p className="font-body mt-2 text-sm text-slate-400">
                  Sign in to continue to your workspace.
                </p>

              </div>


              {/* FORM */}

              <form
                className="space-y-5"
                onSubmit={handleLogin}
              >

                {/* EMAIL */}

                <div>

                  <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                    Email address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="font-body w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                  />

                </div>


                {/* PASSWORD */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="font-body text-sm font-medium text-slate-300">
                      Password
                    </label>


                    {/* FIXED FORGOT PASSWORD */}

                    <Link
                      to="/forgot-password"
                      className="font-body text-xs font-medium text-slate-500 transition duration-300 hover:text-cyan-300"
                    >
                      Forgot password?
                    </Link>

                  </div>


                  <div className="relative">

                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/5"
                    />

                  </div>

                </div>


                {/* REMEMBER */}

                <label className="font-body flex cursor-pointer items-center gap-2 text-xs text-slate-500">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/10 bg-black/20 accent-cyan-400"
                  />

                  Remember me

                </label>


                {/* SUBMIT */}

                <motion.button
                  whileHover={{
                    scale: loading ? 1 : 1.015,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  type="submit"
                  disabled={loading || success}
                  className="font-body group/button relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-80"
                >

                  {/* Button shine */}

                  {!loading && !success && (
                    <span className="absolute inset-y-0 -left-full w-1/3 skew-x-[-20deg] bg-white/40 transition-all duration-700 group-hover/button:left-[120%]" />
                  )}


                  <span className="relative z-10 flex items-center gap-2">

                    <FlickerText>
                      {success
                        ? "Signing in..."
                        : loading
                        ? "Checking..."
                        : "Sign in"}
                    </FlickerText>


                    {!success && !loading && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    )}


                    {loading && !success && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-slate-950" />
                    )}

                  </span>

                </motion.button>


                {/* SUCCESS */}

                {success && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="relative overflow-hidden rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-3"
                  >

                    <div className="absolute inset-y-0 left-0 w-1 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />

                    <p className="font-body text-center text-sm font-medium text-cyan-300">
                      Login successful. Welcome back!
                    </p>

                  </motion.div>
                )}

              </form>

            </div>

          </motion.section>


          {/* REGISTER */}

          <p className="font-body mt-7 text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-medium text-white transition hover:text-cyan-300"
            >
              Create one
            </Link>

          </p>


          {/* BOTTOM STATUS */}

          <div className="mt-8 flex items-center justify-center gap-2">

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-slate-600">
              Secure workspace
            </span>

          </div>

        </motion.div>

      </div>

    </main>
  );
}

export default Login;