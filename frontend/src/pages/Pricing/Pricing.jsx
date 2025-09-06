import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { plans } from "../../data";
import {
  cardContainerVariants,
  cardHoverEffect,
  headingVariants,
} from "../../utils/animations";
import { processPayment } from "../../utils/processPayment";
import { useAuth } from "../../hooks/useAuth";
import { useScript } from "../../hooks/useScript";

function norm(v) {
  return (v || "").toString().trim().toLowerCase();
}

export default function Pricing() {
  useScript("https://checkout.razorpay.com/v1/checkout.js");
  const [activeTab, setActiveTab] = useState("freePremium");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirmUpgrade = async (selectedAmount) => {
    if (!user) {
      toast.error("Please Sign In or Signup first to upgrade your plan.");
      navigate("/login");
      return;
    }
    processPayment(selectedAmount, user);
  };

  return (
    <section
      className="py-20 bg-black/60 text-white relative z-10"
      id="pricing"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_40%)]" />
      </div>

      {/* Heading */}
      <div className="z-10 relative">
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeTab}
            className="pb-2 text-center text-3xl md:text-5xl font-extrabold tracking-normal mb-8 md:mb-11 text-white"
            variants={headingVariants}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Explore our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {activeTab === "freePremium" ? "Plans" : "Credits"}
            </span>
          </motion.h2>
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex justify-center mb-9 md:mb-12 space-x-4">
          <button
            onClick={() => setActiveTab("freePremium")}
            className={`md:text-base text-sm px-6 py-2 rounded-xl font-semibold transition-all ${
              activeTab === "freePremium"
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Free & Premium
          </button>
          <button
            onClick={() => setActiveTab("buyCredits")}
            className={`md:text-base text-sm px-6 py-2 rounded-xl font-semibold transition-all ${
              activeTab === "buyCredits"
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Buy Credits
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
              activeTab === "freePremium" ? "lg:grid-cols-2" : "lg:grid-cols-3"
            }`}
            variants={cardContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.45 }}
          >
            {plans[activeTab].map((plan, i) => {
              const isCurrentPlan = norm(plan.name) === norm(user?.plan);
              return (
                <motion.div
                  key={`${activeTab}-${plan.name}`}
                  className={`relative rounded-2xl p-6 shadow-lg border transition-all transform-gpu ${
                    isCurrentPlan
                      ? "bg-neutral-900 border-blue-400/60 ring-1 ring-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.25)]"
                      : plan.highlight
                      ? "bg-gradient-to-b from-blue-600 to-purple-600 border-blue-400"
                      : "bg-neutral-900 border-neutral-800"
                  }`}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={cardHoverEffect}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active badge */}
                  {isCurrentPlan && (
                    <span className="absolute right-4 top-4 text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/40">
                      Your Plan
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-2xl md:text-3xl font-extrabold mb-4">
                    {plan.price}
                  </p>
                  <p className="text-xs md:text-sm text-gray-300 mb-6">
                    {plan.credits}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm md:text-base"
                      >
                        ✅ <span>{f}</span>
                      </li>
                    ))}
                    {plan.excluded.map((f, idx) => (
                      <li
                        key={idx}
                        className="text-sm md:text-base flex items-center gap-2 text-gray-500"
                      >
                        ❌ <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled={isCurrentPlan}
                    onClick={() => {
                      if (!user) {
                        toast.error(
                          "Please Sign In or Signup first for this feature."
                        );
                        navigate("/login");
                        return;
                      }
                      let numeric = Number(plan.price.replace("₹", ""));
                      console.log(numeric);
                      handleConfirmUpgrade(numeric);
                    }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      isCurrentPlan
                        ? "bg-gray-400 text-black cursor-not-allowed"
                        : plan.highlight
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isCurrentPlan ? "Current Plan" : plan.button}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
