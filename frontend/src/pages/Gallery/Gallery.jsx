import { useState, useEffect } from "react";
import "./gallery.css";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gallery_images } from "../../data";
import { slideTransition, slideVariants } from "../../utils/animations";
import SectionTitle from "../../helpers/SectionTitle";

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const AUTOPLAY_INTERVAL = 5000;
  const DRAG_THRESHOLD = 100;
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % gallery_images.length);
  const prevSlide = () =>
    setIndex(
      (prev) => (prev - 1 + gallery_images.length) % gallery_images.length
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full bg-black/60 py-20 px-6 overflow-hidden mx-auto"
      id="gallery"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)]"></div>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <SectionTitle
          textFirst="AI"
          textSecond="Gallery"
          para="Swipe, use arrows, or sit back and let the magic autoplay."
        />
      </div>

      {/* Carousel Container */}
      <div className="relative w-[90%] flex items-center justify-center mx-auto">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-1 md:left-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg border border-white/20 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-200" />
        </button>

        {/* Slides */}
        <div className="md:overflow-hidden w-[340px] md:w-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative min-w-[300px] h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex-shrink-0"
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
                className="w-full h-[85%] object-cover rounded-t-3xl"
              />
              {/* Prompt */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-5">
                <h3 className="text-gray-100 text-lg md:text-xl font-bold text-center">
                  {gallery_images[index].prompt}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-1 md:right-4 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg border border-white/20 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-200" />
        </button>
      </div>
    </section>
  );
};

export default Gallery;
