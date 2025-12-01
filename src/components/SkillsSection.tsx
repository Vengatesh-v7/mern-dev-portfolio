import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Monitor, Server, Database, Wrench } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { FullScreenImageModal } from "../components/ui/fullScreenImageModal"; // Import it!

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

  // Modal state
  const [selectedCert, setSelectedCert] = useState(null);

  const openFullScreen = (cert) => {
    setSelectedCert(cert);
  };

  const closeFullScreen = () => {
    setSelectedCert(null);
  };

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeFullScreen();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  console.log("Certificates:", portfolioData.certificates);

  return (
    <>
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
            <span className="text-primary font-mono text-xl mb-4 block">
              Skills
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Technologies I <span className="gradient-text">work with</span>
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                className="glass rounded-2xl p-6 hover:glow-effect transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="px-4 py-2 rounded-lg bg-secondary/50 text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all cursor-default"
                    >
                      <span className="flex items-center gap-2">
                        <span>{skill.name}</span>
                        <span>
                          <img
                            src={skill.logo}
                            height={24}
                            width={24}
                          />
                        </span>
                      </span>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certificates Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="gradient-text">Certifications</span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {portfolioData.certificates.map((cert, index) => (
                <div key={cert.title} className="flex flex-col items-center">
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 80 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="group relative glass rounded-2xl overflow-hidden cursor-zoom-in hover:glow-effect transition-all duration-300"
                    onClick={() => openFullScreen(cert)}
                  >
                    {/* Certificate Image */}
                    <div className="aspect-auto relative overflow-hidden bg-black/20">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full  h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Text Overlay */}

                    {/* Click Hint */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to enlarge
                    </div>
                  </motion.div>
                  <motion.div
                    key={cert.title + "-text"}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="mt-4 text-center"
                  >
                    <div className="font-medium text-sm">{cert.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {cert.issuer}
                    </div>
                    <div className="text-primary text-xs font-mono mt-2">
                      {cert.year}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full-Screen Modal */}
      <FullScreenImageModal
        isOpen={!!selectedCert}
        onClose={closeFullScreen}
        imageSrc={selectedCert?.image}
        title={selectedCert?.title}
      />
    </>
  );
};
