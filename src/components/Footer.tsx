import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mb-72 sm:mb-4 border-t  border-border">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Built with</span>
             <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="inline-block mx-2"
                >
            <Heart className="w-4 h-4 text-green-400 fill-green-700" />
                </motion.span>
            <span>by</span>
            <span className="gradient-text font-semibold">{portfolioData.personal.name}</span>
          </div>

          <div className="text-muted-foreground text-sm font-mono">
            © {currentYear} All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

