import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ChevronRight, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { projects } = portfolioData;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-xl mb-4 block">
            Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className="glass rounded-2xl p-8 h-full hover:glow-effect transition-all duration-500 relative overflow-hidden">
                {/* Background Gradient on Hover */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Project Number */}
                  <span className="text-6xl font-bold text-primary/10 absolute -top-4 -right-4 font-mono">
                    0{index + 1}
                  </span>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg">
                        <img src={project.logo} height={30} width={30} />
                      </div>
                      <h3 className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full text-xs font-mono bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
