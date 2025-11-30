import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Monitor, 
  Server, 
  Database, 
  Wrench 
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const skillCategories = [
  {
    title: "Front-End",
    icon: Monitor,
    skills: portfolioData.skills.frontend,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Back-End",
    icon: Server,
    skills: portfolioData.skills.backend,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Databases",
    icon: Database,
    skills: portfolioData.skills.databases,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "Tools & Collaboration",
    icon: Wrench,
    skills: portfolioData.skills.tools,
    gradient: "from-orange-500 to-red-500",
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">04. Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              className="glass rounded-2xl p-6 hover:glow-effect transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-4 py-2 rounded-lg bg-secondary/50 text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">Certifications</span>
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-4 text-center hover:glow-effect transition-all"
              >
                <p className="font-medium text-sm mb-1">{cert.title}</p>
                <p className="text-muted-foreground text-xs">{cert.issuer}</p>
                <p className="text-primary text-xs font-mono mt-2">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
