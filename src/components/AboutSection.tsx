import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Briefcase, GraduationCap, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const stats = [
  { icon: Briefcase, label: "Years Experience", value: "3+" },
  { icon: Code2, label: "Projects Delivered", value: "10+" },
  { icon: Award, label: "Certifications", value: "4" },
  { icon: GraduationCap, label: "Education", value: "B.Sc., B.Ed," },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { education, attributes } = portfolioData;

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-xl mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Get to know <span className="gradient-text">me better</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Full Stack Developer specializing in the MERN
              stack, with a strong foundation in both front-end and back-end
              development. My journey in tech has been driven by curiosity and a
              desire to create impactful digital solutions.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With {portfolioData.experience.length} companies under my belt,
              I've had the privilege of working on diverse projects ranging from
              ERP systems to mobile applications. I believe in writing clean,
              maintainable code and staying updated with the latest
              technologies.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </h3>

              {education.map((education) => (
                <div className="glass rounded-xl p-4 mb-2">
                  <p className="font-medium">{education.degree}</p>
                  <p className="text-muted-foreground text-sm">
                    {education.institution}
                  </p>
                  <p className="text-primary text-sm font-mono">
                    {education.year}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">
                Professional Attributes
              </h3>
              <div className="flex gap-12 flew-wrap items-center ">
                {attributes.map((attr, index) => (
                  <motion.span
                    key={attr}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="px-8  py-4 rounded-full border-primary border-2 glass text-sm text-muted-foreground cursor-pointer hover:bg-primary hover:text-white hover:glow-effect transition-all duration-300 block"
                  >
                    {attr}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center group hover:glow-effect transition-all duration-300"
              >
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
