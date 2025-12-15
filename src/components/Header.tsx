import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { createPortal } from "react-dom";
import { portfolioData } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import ProfileImage from "@/assets/profile.jpg";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
  { name: "Info", href: "#info" },
];

// Profile Avatar with Tooltip
const ProfileAvatar = ({ onClick }: { onClick: () => void }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        className="relative block rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all duration-300 focus-visible:ring-primary focus-visible:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="View full profile image"
      >
        <img
          src={ProfileImage}
          alt="Vengatesh profile photo"
          loading="eager"
          decoding="async"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
      </motion.button>

      {/* Desktop Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-white text-xs px-3 py-2 rounded-md shadow-xl z-50 pointer-events-none hidden sm:block"
        >
          Click to view full image
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90" />
        </motion.div>
      )}
    </div>
  );
};

// Full-Screen Image Modal (Fully Responsive for all devices)
const FullScreenImageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out p-4 sm:p-6 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-xl flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Positioned above image on mobile, top-right on desktop */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 sm:top-0 sm:-right-14 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center transition-all"
          aria-label="Close full image"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>

        {/* Responsive Image - Centered */}
        <motion.img
          src={ProfileImage}
          alt="Full profile - VK"
          className="w-full max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] object-contain rounded-md sm:rounded-2xl shadow-2xl border border-white/10"
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullScreenImageOpen, setIsFullScreenImageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullScreenImageOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when menu/modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isFullScreenImageOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isFullScreenImageOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full max-w-[100vw] ${
          isScrolled
            ? "glass py-2 sm:py-3 md:py-4 shadow-lg"
            : "py-3 sm:py-5 md:py-7 bg-transparent"
        }`}
      >
        <nav className="w-full max-w-[100vw] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo + Avatar */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
              <ProfileAvatar onClick={() => setIsFullScreenImageOpen(true)} />
              <motion.a
                href="#"
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VK
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground text-sm xl:text-base font-medium relative group transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}

              <ThemeToggle />

              <motion.a
                href={portfolioData.personal.resumeUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 text-foreground font-medium text-sm transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:hidden flex-shrink-0">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Full Width & Better Spacing */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass mt-2 mx-4 rounded-2xl border border-border/50 overflow-hidden"
            >
              <div className="p-6 space-y-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-lg font-medium text-foreground/90 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}

                <a
                  href={portfolioData.personal.resumeUrl}
                  download
                  className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-base mt-6 hover:bg-primary/90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full-Screen Image Modal */}
      <FullScreenImageModal
        isOpen={isFullScreenImageOpen}
        onClose={() => setIsFullScreenImageOpen(false)}
      />
    </>
  );
};