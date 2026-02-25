import { useState, useEffect } from "react";
import "./gallery.css";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { gallery_images } from "../../data";
import { slideTransition, slideVariants } from "../../utils/animations";

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const AUTOPLAY_INTERVAL = 5000;
  const DRAG_THRESHOLD = 100;

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % gallery_images.length);
  const prevSlide = () =>
    setIndex(
      (prev) => (prev - 1 + gallery_images.length) % gallery_images.length,
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full bg-black/60 py-32 px-6 overflow-hidden mx-auto z-10"
      id="gallery"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_60%)]"></div>
      </div>
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-8"
        >
          <Sparkles size={14} /> The Masterpieces
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
        >
          Everything You Can <br />{" "}
          <span className="text-blue-500">Imagine</span>
        </motion.h2>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-5xl mx-auto px-12 group">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300 transform md:-translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slides */}
        <div className="relative overflow-hidden aspect-[4/5] md:w-[400px] rounded-[3rem] border border-white/10 shadow-2xl bg-zinc-900 mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={slideTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -DRAG_THRESHOLD) nextSlide();
                if (info.offset.x > DRAG_THRESHOLD) prevSlide();
              }}
            >
              {/* Image */}
              <img
                src={gallery_images[index].img}
                alt={gallery_images[index].prompt}
                className="w-full h-full object-cover"
              />

              {/* Prompt Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end items-center text-center">
                <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-4">
                  Prompt
                </p>
                <h3 className="text-white text-xl md:text-3xl font-bold max-w-2xl leading-relaxed">
                  "{gallery_images[index].prompt}"
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300 transform md:translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {gallery_images.slice(0, 10).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${index % 10 === i ? "w-8 bg-blue-500" : "w-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
