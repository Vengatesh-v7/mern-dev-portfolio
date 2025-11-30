import { motion } from "framer-motion";
import { Code2, Terminal, Database, Braces } from "lucide-react";

export const DeveloperAvatar = () => {
  const floatingIcons = [
    { Icon: Code2, delay: 0, x: -60, y: -40 },
    { Icon: Terminal, delay: 0.2, x: 60, y: -30 },
    { Icon: Database, delay: 0.4, x: -50, y: 50 },
    { Icon: Braces, delay: 0.6, x: 55, y: 45 },
  ];

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Animated rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border-2 border-accent/30"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-primary/20"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main avatar container */}
      <motion.div
        className="absolute inset-12 rounded-full glass glow-effect flex items-center justify-center overflow-hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        
        {/* Avatar initials */}
        <motion.div
          className="relative z-10"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-4xl md:text-5xl font-bold gradient-text">VK</span>
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 p-2 rounded-lg glass"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: x,
            y: y,
          }}
          transition={{
            duration: 0.5,
            delay: delay + 0.5,
            type: "spring",
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </motion.div>
        </motion.div>
      ))}

      {/* Orbiting dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-primary shadow-lg"
        style={{ marginLeft: -6, marginTop: -6 }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-primary"
          style={{ transform: "translateX(100px)" }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};
