// components/FullScreenImageModal.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export const FullScreenImageModal = ({ isOpen, onClose, imageSrc, title = "Certificate" }) => {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm cursor-zoom-out"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-3xl max-h-lg p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-all"
          aria-label="Close"
        >
          <X className="w-8 h-8 text-slate-800" />
        </button>

        {/* Certificate Title */}
        <h3 className="text-slate-800 text-xl md:text-2xl font-bold text-center mb-6 opacity-90">
          {title}
        </h3>

        {/* Full Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <motion.img
            src={imageSrc}
            alt={title}
            className="w-full h-auto max-h-screen object-contain"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </div>

      </motion.div>
    </motion.div>,
    document.body
  );
};