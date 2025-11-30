import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, ChevronRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">02. Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Where I've <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative pl-8 md:pl-0 pb-12 ${
                  index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 ${
                    exp.current ? "animate-glow-pulse" : ""
                  }`}
                  whileHover={{ scale: 1.5 }}
                />

                <motion.div
                  className={`glass rounded-2xl p-6 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  } hover:glow-effect transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  {exp.current && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono mb-3">
                      Current
                    </span>
                  )}
                  
                  <div className={`flex items-center gap-2 mb-2 ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}>
                    <Building2 className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{exp.role}</p>
                  
                  <div className={`flex items-center gap-2 text-sm text-muted-foreground ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono">{exp.period}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
