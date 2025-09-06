import { motion } from "framer-motion";
import { textAnimation } from "../utils/animations";
const SectionTitle = ({ textFirst, textSecond, para }) => {
  return (
    <>
      <motion.h2
        className="heading text-3xl md:text-5xl font-extrabold tracking-normal text-white"
        variants={textAnimation}
        initial="initial"
        whileInView="animate"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {textFirst}{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {textSecond}
        </span>
      </motion.h2>

      <motion.p
        className="mt-3 md:text-base text-sm text-gray-400 max-w-2xl mx-auto"
        variants={textAnimation}
        initial="initial"
        whileInView="animate"
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {para}
      </motion.p>
    </>
  );
};
export default SectionTitle;
