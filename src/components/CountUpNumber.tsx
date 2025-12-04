import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpNumberProps {
  value: string;
  className?: string;
}

export const CountUpNumber = ({ value, className = "" }: CountUpNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Extract numeric part and suffix (e.g., "3+" -> { num: 3, suffix: "+" })
  const parseValue = (val: string) => {
    const match = val.match(/^(\d+)(.*)$/);
    if (match) {
      return { num: parseInt(match[1], 10), suffix: match[2] };
    }
    return { num: 0, suffix: val };
  };

  const { num, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * num);
      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(`${num}${suffix}`);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, num, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
    >
      {displayValue}
    </motion.span>
  );
};

// For text values that should have a rolling/typewriter effect
export const RollingText = ({ value, className = "" }: CountUpNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    const chars = value.split("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= chars.length) {
        setDisplayText(chars.slice(0, currentIndex).join(""));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {displayText || value.charAt(0)}
    </motion.span>
  );
};
