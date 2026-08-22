import { useMemo } from "react";
import { motion } from "framer-motion";

function CyberBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 55 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      moveX: Math.random() * 80 - 40,
      moveY: Math.random() * 120 - 60,
      opacity: Math.random() * 0.45 + 0.15,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ================================================ */}
      {/* BASE ATMOSPHERE                                   */}
      {/* ================================================ */}

      <div className="absolute inset-0 bg-[#030712]" />

      {/* Cyan glow */}

      <div className="absolute left-[-12%] top-[-15%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />

      {/* Violet glow */}

      <div className="absolute bottom-[-15%] right-[-12%] h-[550px] w-[550px] rounded-full bg-violet-500/[0.07] blur-[150px]" />

      {/* Small center glow */}

      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.025] blur-[120px]" />


      {/* ================================================ */}
      {/* DIGITAL GRID                                      */}
      {/* ================================================ */}

      <div
        className="
          absolute inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />


      {/* ================================================ */}
      {/* CYBER PARTICLES                                   */}
      {/* ================================================ */}

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow:
              "0 0 8px rgba(34,211,238,0.65)",
          }}
          animate={{
            x: [
              0,
              particle.moveX,
              particle.moveX * -0.5,
              0,
            ],

            y: [
              0,
              particle.moveY,
              particle.moveY * -0.5,
              0,
            ],

            opacity: [
              particle.opacity * 0.4,
              particle.opacity,
              particle.opacity * 0.25,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* ================================================ */}
      {/* FLOATING DIGITAL DUST                            */}
      {/* ================================================ */}

      {Array.from({ length: 18 }).map((_, index) => (
        <motion.div
          key={`dust-${index}`}
          className="absolute h-[1px] w-[1px] rounded-full bg-violet-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow:
              "0 0 6px rgba(167,139,250,0.7)",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: 5 + Math.random() * 6,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* ================================================ */}
      {/* SCANLINE                                           */}
      {/* ================================================ */}

      <motion.div
        className="absolute left-0 h-px w-full bg-cyan-400/[0.035]"
        animate={{
          top: ["0%", "100%"],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* ================================================ */}
      {/* DARK VIGNETTE                                     */}
      {/* ================================================ */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,7,18,0.45)_100%)]" />

    </div>
  );
}

export default CyberBackground;