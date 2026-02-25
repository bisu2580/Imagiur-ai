import { features } from "../../data";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { featureCardVariants } from "../../utils/animations";

export default function Features() {
  return (
    <section
      className="relative w-full py-32 bg-black/60 text-center z-10"
      id="features"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_60%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white"
          >
            Powerful AI at Your <br />{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Fingertips
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            Our toolset is engineered for professionals who demand excellence,
            speed, and creative freedom.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getTheme = (colorStr) => {
    if (colorStr.includes("blue"))
      return {
        text: "text-blue-400",
        bg: "group-hover:bg-blue-600",
        border: "hover:border-blue-500/50",
        glow: "rgba(59, 130, 246, 0.15)",
      };
    if (colorStr.includes("fuchsia") || colorStr.includes("purple"))
      return {
        text: "text-fuchsia-400",
        bg: "group-hover:bg-fuchsia-600",
        border: "hover:border-fuchsia-500/50",
        glow: "rgba(192, 38, 211, 0.15)",
      };
    if (colorStr.includes("emerald") || colorStr.includes("teal"))
      return {
        text: "text-emerald-400",
        bg: "group-hover:bg-emerald-600",
        border: "hover:border-emerald-500/50",
        glow: "rgba(16, 185, 129, 0.15)",
      };
    if (colorStr.includes("yellow") || colorStr.includes("orange"))
      return {
        text: "text-yellow-400",
        bg: "group-hover:bg-yellow-600",
        border: "hover:border-yellow-500/50",
        glow: "rgba(234, 179, 8, 0.15)",
      };
    if (colorStr.includes("cyan"))
      return {
        text: "text-cyan-400",
        bg: "group-hover:bg-cyan-600",
        border: "hover:border-cyan-500/50",
        glow: "rgba(6, 182, 212, 0.15)",
      };
    return {
      text: "text-purple-400",
      bg: "group-hover:bg-purple-600",
      border: "hover:border-purple-500/50",
      glow: "rgba(168, 85, 247, 0.15)",
    };
  };

  const theme = getTheme(feature.color);
  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={featureCardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 ${theme.border} transition-all duration-500 flex flex-col items-start text-left gap-4 relative overflow-hidden h-full`}
    >
      {/* Static Gradient Blur */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Interactive Mouse Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${theme.glow}, transparent 80%)`,
        }}
      />

      {/* Image Preview */}
      <div className="w-full h-48 rounded-[1.5rem] overflow-hidden mb-6 relative z-10 border border-white/5">
        <img
          src={feature.img}
          alt={feature.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col">
        <div
          className={`p-4 inline-flex rounded-2xl bg-white/5 border border-white/10 ${theme.text} group-hover:scale-110 ${theme.bg} group-hover:text-white transition-all duration-500 mb-6 w-fit`}
        >
          <Icon size={32} />
        </div>
        <h3 className="text-3xl font-extrabold mb-4 text-white">
          {feature.title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-base font-normal line-clamp-2 flex-1">
          {feature.desc}
        </p>

        <div className="mt-10 flex items-center gap-3 text-sm font-black text-white/15 group-hover:text-white/50 transition-colors uppercase tracking-[0.2em]">
          Feature {index + 1}
        </div>
      </div>
    </motion.div>
  );
}
