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
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md cursor-zoom-out p-3 sm:p-4 md:p-6 lg:p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-1/4 max-w-[95vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-3xl flex flex-col items-center justify-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Above content on mobile, side on larger screens */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 sm:-top-2 sm:-right-12 md:-right-14 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
        </button>

        {/* Certificate Title - Centered */}
        <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center mb-3 sm:mb-4 md:mb-5 mt-2 sm:mt-0 px-2">
          {title}
        </h3>

        {/* Full Image - Centered with proper constraints */}
        <div className="w-1/4 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
          <motion.img
            src={imageSrc}
            alt={title}
            className=" h-auto rounded-md max-h-[30vh] sm:max-h-[65vh] md:max-h-[70vh] lg:max-h-[75vh] object-contain mx-auto"
            width={'60%'}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};
