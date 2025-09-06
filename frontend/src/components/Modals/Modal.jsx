import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, onUpload }) {
  const handleFileSelect = (event) => {
    if (onUpload) {
      onUpload(event);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 w-[400px] relative border border-gray-700"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Upload an Image
            </h2>

            {/* File Input */}
            <div className="border-2 border-dashed border-gray-600 hover:border-purple-500 transition rounded-xl p-6 text-center cursor-pointer">
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label
                htmlFor="fileUpload"
                className="text-gray-400 cursor-pointer"
              >
                <span className="block text-lg">📂 Choose File</span>
                <span className="text-sm">or drag & drop here</span>
              </label>
            </div>

            {/* Upload Button */}
            <button
              onClick={onUpload}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-xl transition shadow-lg"
            >
              Upload
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
