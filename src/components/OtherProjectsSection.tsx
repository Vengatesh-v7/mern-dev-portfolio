import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ChevronDown, Layers } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const otherProjects = [
  {
    id: "1",
    title: "Task Manager Pro",
    description: "A full-stack task management application with real-time collaboration features, drag-and-drop functionality, and team workspaces.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    highlights: [
      "Real-time task updates across team members",
      "Drag-and-drop Kanban board interface",
      "Role-based access control",
      "Email notifications for task assignments"
    ],
    liveUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/vengatesh/task-manager",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop"
  },
  {
    id: "2",
    title: "E-Commerce Dashboard",
    description: "An admin dashboard for e-commerce platforms with analytics, inventory management, and order processing capabilities.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Chart.js"],
    highlights: [
      "Comprehensive sales analytics and reporting",
      "Real-time inventory tracking",
      "Multi-vendor support system",
      "Automated order processing workflow"
    ],
    liveUrl: "https://ecommerce-dash.demo.com",
    githubUrl: "https://github.com/vengatesh/ecommerce-dashboard",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop"
  }
];

export const OtherProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="other-projects"
      ref={ref}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              More Projects
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Click to explore more projects I've worked on
          </p>
        </motion.div>

        {/* Accordion Projects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {otherProjects.map((project, index) => (
              <AccordionItem
                key={project.id}
                value={project.id}
                className="border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline group">
                  <div className="flex items-center gap-3 sm:gap-4 w-full">
                    <img
                      src={project.logo}
                      alt={project.title}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-border/50"
                    />
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 sm:px-6 pb-5 sm:pb-6">
                  <div className="space-y-4 sm:space-y-5 pt-2">
                    {/* Full Description */}
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                        Key Highlights
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs sm:text-sm font-medium transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Source Code
                      </a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default OtherProjectsSection;
