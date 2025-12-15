import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { DeveloperAvatar } from "./DeveloperAvatar";

const HeroSection = memo(() => {
  const { personal, summary } = portfolioData;
  const prefersReducedMotion = useReducedMotion();

  // Memoize animation variants
  const bgAnimation = useMemo(() => 
    prefersReducedMotion ? {} : {
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.3, 0.2],
    }, [prefersReducedMotion]
  );

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Simplified Background - CSS only when reduced motion */}
      <div className="absolute inset-0 overflow-hidden">
        {prefersReducedMotion ? (
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-30" />
        ) : (
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl will-change-transform"
            animate={bgAnimation}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Developer Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <DeveloperAvatar />
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-primary">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="gradient-text text-glow">{personal.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 font-light"
            >
              {personal.title}
            </motion.h2>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-6"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>{personal.location}</span>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
            >
              {summary}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href={`mailto:${personal.email}`}
                className="p-3 rounded-xl glass hover:bg-primary/10 transition-colors group"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href={`https://${personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-primary/10 transition-colors group"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:bg-primary/10 transition-colors group"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            </motion.div>

            {/* Quiz Fun Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <motion.a
                href="#quiz"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 gap-2"
                >
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  QUIZ Fun
                </Button>
              </motion.a>
            </motion.div> */}
          </div>
        </div>

      {/* Scroll Indicator - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          >
            <span className="text-sm font-mono">Scroll down</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
export { HeroSection };
