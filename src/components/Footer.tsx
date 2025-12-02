import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 mb-20 sm:mb-4 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left"
        >
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="inline-block"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 fill-green-700" />
            </motion.span>
            <span>by</span>
            <span className="gradient-text font-semibold">{portfolioData.personal.name}</span>
          </div>

          <div className="text-muted-foreground text-xs sm:text-sm font-mono">
            © {currentYear} All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

