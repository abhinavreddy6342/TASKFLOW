import { useState } from "react";

function FlickerText({ children, className = "" }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <span
      className={`flicker-text ${isHovering ? "flicker-active" : ""} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </span>
  );
}

export default FlickerText;