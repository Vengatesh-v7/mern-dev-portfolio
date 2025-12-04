import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Briefcase, GraduationCap, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { CountUpNumber, RollingText } from "./CountUpNumber";

const stats = [
  { icon: Briefcase, label: "Years Experience", value: "3+", isNumeric: true },
  { icon: Code2, label: "Projects Delivered", value: "10+", isNumeric: true },
  { icon: Award, label: "Certifications", value: "4", isNumeric: true },
  { icon: GraduationCap, label: "Education", value: "B.Sc., B.Ed", isNumeric: false },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { education, attributes } = portfolioData;

  return (
    <section id="about" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-mono text-lg sm:text-xl mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Get to know <span className="gradient-text">me better</span>
          </h2>
        </motion.div>

        {/* Main Grid - Mobile: Stack, Tablet+: Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Content - Bio + Education + Attributes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Bio Text */}
            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Full Stack Developer specializing in the MERN
                stack, with a strong foundation in both front-end and back-end
                development. My journey in tech has been driven by curiosity and a
                desire to create impactful digital solutions.
              </p>
              <p>
                With {portfolioData.experience.length} companies under my belt,
                I've worked on diverse projects — from ERP systems to mobile apps.
                I value clean, maintainable code and continuously learn new technologies.
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-5 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass rounded-xl p-5 border border-white/10"
                  >
                    <p className="font-semibold text-foreground">{edu.degree}</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {edu.institution}
                    </p>
                    <p className="text-primary text-sm font-mono mt-2">
                      {edu.year}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Professional Attributes - Horizontal on large, grid on medium/small */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">
                Professional Attributes
              </h3>
              {/* Large screens: horizontal flex row */}
              <div className="hidden lg:flex gap-3 flex-wrap">
                {attributes.map((attr, index) => (
                  <motion.span
                    key={attr}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    className="px-4 py-2.5 rounded-full border-2 border-primary/50 glass-backdrop text-foreground text-sm font-medium 
                               hover:bg-primary hover:text-white hover:border-primary hover:glow-effect 
                               transition-all duration-300 whitespace-nowrap cursor-default"
                  >
                    {attr}
                  </motion.span>
                ))}
              </div>
              {/* Medium screens: 3 columns grid */}
              <div className="hidden md:grid lg:hidden grid-cols-3 gap-2">
                {attributes.map((attr, index) => (
                  <motion.span
                    key={attr}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    className="px-3 py-2 rounded-full border-2 border-primary/50 glass-backdrop text-foreground text-xs font-medium 
                               hover:bg-primary hover:text-white hover:border-primary hover:glow-effect 
                               transition-all duration-300 text-center cursor-default"
                  >
                    {attr}
                  </motion.span>
                ))}
              </div>
              {/* Small screens: 2 columns grid */}
              <div className="grid md:hidden grid-cols-2 gap-2">
                {attributes.map((attr, index) => (
                  <motion.span
                    key={attr}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    className="px-2 py-2 rounded-full border-2 border-primary/50 glass-backdrop text-foreground text-xs font-medium 
                               hover:bg-primary hover:text-white hover:border-primary hover:glow-effect 
                               transition-all duration-300 text-center cursor-default"
                  >
                    {attr}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Stats Grid with Count-up Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center group hover:glow-effect transition-all duration-300 min-w-0"
              >
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                  {stat.isNumeric ? (
                    <CountUpNumber value={stat.value} />
                  ) : (
                    <RollingText value={stat.value} />
                  )}
                </div>
                <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};