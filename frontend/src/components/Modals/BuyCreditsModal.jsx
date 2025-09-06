import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { creditPlans } from "../../data";

const BuyCreditsModal = ({ isOpen, onClose, onConfirmUpgrade }) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const handleConfirm = async (amount) => {
    setIsUpgrading(true);
    await onConfirmUpgrade(amount);
    setIsUpgrading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 md:p-6 w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-white">
                Choose a Credit Pack
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-xl md:text-2xl"
              >
                ✖
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {creditPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center hover:border-purple-500 transition w-[80%] md:w-[100%] mx-auto"
                >
                  <p className="text-xl md:text-2xl font-bold text-purple-400">
                    {plan.credits}
                  </p>
                  <p className="text-gray-300 mb-2 md:mb-4">Credits</p>
                  <p className="text-base md:text-lg text-white mb-3 md:mb-4">
                    &#8377;{plan.price}
                  </p>
                  <button
                    className="px-3 py-2 md:px-4 md:py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition text-sm md:text-base"
                    onClick={() => handleConfirm(Number(plan.price))}
                    disabled={isUpgrading}
                  >
                    {isUpgrading ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BuyCreditsModal;
