import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export const FullScreenImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  title = "Certificate",
}) => {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 sm:top-2 sm:-right-14 right-2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center transition-all"
          aria-label="Close"
        >
          <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </button>

        {/* Certificate Title */}
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6">
          {title}
        </h3>

        {/* Full Image */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <motion.img
            src={imageSrc}
            alt={title}
            className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};
