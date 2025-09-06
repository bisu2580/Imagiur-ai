import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

const UpgradeModal = ({ isOpen, onClose, onConfirmUpgrade }) => {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleConfirm = async () => {
    setIsUpgrading(true);
    await onConfirmUpgrade();
    setIsUpgrading(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-sm relative border border-gray-700"
          >
            {/* --- MODIFIED CONTENT STARTS HERE --- */}
            <div className="p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-indigo-500 mb-5" />
              <h2 className="text-xl font-bold text-white mb-4">
                Confirm Your Upgrade
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-8">
                Are you sure you want to upgrade to Unlimited for ₹4999?
              </p>

              {/* Yes/No Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  disabled={isUpgrading}
                  className="text-sm md:text-base w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-lg transition-colors shadow-lg"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isUpgrading}
                  className="text-sm md:text-base w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-wait"
                >
                  {isUpgrading ? "Processing..." : "Yes, Upgrade"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
