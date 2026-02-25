import { motion } from "framer-motion";

const GlowingDivider = () => {
  return (
    <div className="relative w-full h-[1px] flex justify-center items-center overflow-visible z-10">
      {/* Centered Glowing Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full max-w-7xl h-full"
      >
        {/* The Divider Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        {/* The Outer Glow */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent blur-[8px]" />

        {/* Subtle Bottom Accent Glow */}
        <div className="absolute -top-[10px] left-1/2 -track-x-1/2 w-48 h-[20px] bg-purple-600/5 blur-[20px] rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default GlowingDivider;
