
import { motion } from "framer-motion";
import { Code2, Terminal, Database, Braces } from "lucide-react";
import ProfileImage from "@/assets/profile.jpg";

export const DeveloperAvatar = () => {
  const floatingIcons = [
    { Icon: Code2, delay: 0, x: -150, y: -60 },
    { Icon: Terminal, delay: 0.2, x: 150, y: -50 },
    { Icon: Database, delay: 0.4, x: -150, y: 70 },
    { Icon: Braces, delay: 0.6, x: 125, y: 65 },
  ];

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      {/* Subtle background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-3xl" />

      {/* Pulsing outer rings */}
      <motion.div
        className="absolute w-full h-full rounded-full border border-primary"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-full h-full rounded-full border border-accent/15"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Avatar Circle - Perfectly Centered */}
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/90 backdrop-blur-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
      >
        {/* Soft inner gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20" /> */}
        
        {/* Profile Image - Perfectly fitted */}
        <img
          src={ProfileImage}
          alt="Vishal Kumar"
          className="w-full h-full object-cover"
        />

        {/* Gentle floating animation on image */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Shimmer sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Floating Tech Icons Around Avatar */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x,
            y,
          }}
          transition={{
            duration: 0.8,
            delay: delay + 0.6,
            type: "spring",
            stiffness: 120,
          }}
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity },
              delay: index * 0.3,
            }}
            className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg"
          >
            <Icon className="w-7 h-7 text-white drop-shadow-md" />
          </motion.div>
        </motion.div>
      ))}

      {/* Small orbiting dot for extra life */}
      <motion.div
        className="absolute w-3 h-3 rounded-full shadow-blue-100/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "340px",
          height: "340px",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/80 blur-md" />
      </motion.div>
    </div>
  );
};