import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {  Calendar } from "lucide-react";
import { portfolioData } from "@/data/portfolio";


export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { experience } = portfolioData;

  return (
    <section id="experience" className="py-6 relative" ref={ref}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-mono text-xl tracking-widest">
            EXPERIENCE
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Where I've <span className="gradient-text">Worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Always Visible */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

          {experience.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className="relative flex items-center justify-center mb-32 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-12 bg-primary rounded-full ring-8 ring-background shadow-xl z-10 hidden md:block">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                </div>

                {/* Card - Fixed 3:1 Ratio, Animate from Side to Center */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -100 : 100,
                    scale: 0.8,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    duration: 1,
                    delay: index * 0.5, // Each card appears every ~1 second
                    ease: "easeOut",
                  }}
                  className={`w-full max-w-2xl ${
                    isLeft ? "md:mr-auto md:pr-20" : "md:ml-auto md:pl-20"
                  }`}
                >
                  <div
                    className="glass-card rounded-2xl aspect-auto px-6 py-4 border border-border/50 backdrop-blur-md hover:border-primary/40 transition-all duration-500 shadow-2xl"
                  >
                    <div className="flex flex-col justify-evenly h-full">
                      {/* Top Row 1: Company + Icon */}
                      <div className="flex justify-between items-start ">
                        <div>
                          <h3 className="text-3xl font-bold text-foreground">
                            {exp.company}
                          </h3>
                          <p className="text-primary text-xl font-medium mt-1">
                            {exp.role}
                          </p>
                        </div>

                        <img  src={exp.logo} alt={exp.company} height={60} width={50}/>
                      </div>

                      {/* Row 2: Period + Location */}
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span className="font-mono text-sm">
                            {exp.period}
                          </span>
                        </div>
                        <span>•</span>
                        <span className="text-sm">{exp.location}</span>
                        {exp.current && (
                          <>
                           <span>•</span>
                          <span className=" px-4 py-1 rounded-full  border-2 border-primary text-primary text-xs font-bold tracking-wider">
                            Present
                          </span>
                          </>
                        )}
                      </div>

                      {/* Row 3: Description */}
                      <p className="text-foreground/80 text-md leading-relaxed m-2">
                        {exp.description}
                      </p>

                      {/* Row 4: Highlights */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {exp.highlights.map((highlight, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.5 + 0.8 + i * 0.15 }}
                            className="flex items-start gap-2 text-foreground/80"
                          >
                            <span className="text-primary text-2xl">▹</span>
                            <span className="text-sm leading-relaxed">
                              {highlight}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
