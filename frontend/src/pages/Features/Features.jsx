import { features } from "../../data";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { featureCardVariants } from "../../utils/animations";
import SectionTitle from "../../helpers/SectionTitle";

export default function Features() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);
  const getGlowColor = (id) =>
    id % 2 === 0
      ? {
          border: "border-[#34D399]/40",
          glow: "rgba(52, 211, 153, 0.4)",
          text: "text-[#34D399]",
        }
      : {
          border: "border-[#FACC15]/40",
          glow: "rgba(250, 204, 21, 0.4)",
          text: "text-[#FACC15]",
        };
  return (
    <section
      className="relative w-full py-20 bg-black/60 text-center"
      id="features"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_40%)]"></div>
      </div>
      <div className="text-center mb-12">
        <SectionTitle
          textFirst="Powerful"
          textSecond="Features"
          para="Explore what you can do with our all-in-one AI platform."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {features.map(({ id, title, desc, icon: Icon, img, color }) => {
          const { border, glow, text } = getGlowColor(id);
          return (
            <motion.div
              key={id}
              ref={divRef}
              custom={id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={featureCardVariants}
              exit="exit"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
                setVisible(true);
              }}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
              className={`relative rounded-2xl p-6 transition-all duration-300 bg-zinc-950 border group overflow-hidden ${border}`}
            >
              {/* Moving Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                  background: `radial-gradient(200px circle at ${position.x}px ${position.y}px,${glow},transparent 90%)`,
                }}
              />

              {/* Image Preview */}
              <div className="w-full h-45 rounded-xl overflow-hidden mb-4 relative z-10">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>

              {/* Icon + Title */}
              <div
                className={`flex items-center justify-center gap-3 relative z-10 ${text}`}
              >
                <Icon className="size-5" />
                <h3 className="text-lg font-bold">{title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 mt-3 text-sm relative z-10">{desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
