import { motion } from "framer-motion";

function FlickerText({ children, className = "" }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{
        opacity: 1,
      }}
      whileHover={{
        opacity: [1, 0.55, 1, 0.7, 1],
        textShadow: [
          "0 0 0px transparent",
          "0 0 6px rgba(34,211,238,0.7)",
          "0 0 2px transparent",
          "0 0 10px rgba(34,211,238,0.8)",
          "0 0 0px transparent",
        ],
        x: [0, -1, 1, -0.5, 0],
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

export default FlickerText;