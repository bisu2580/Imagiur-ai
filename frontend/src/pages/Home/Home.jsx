import { useNavigate } from "react-router-dom";
import photo from "../../assets/photo.png";
import { motion } from "framer-motion";
import { cardTitles, features, gallery_images, LOGOS } from "../../data";
import { useEffect, useState } from "react";
import { randomFloat } from "../../utils/animations";
import "./home.css";
import { RESUME_POINTS } from "../../data";
import cat from "../../assets/cat.jpg";
import { useAuth } from "../../hooks/useAuth";
import { Rocket, Sparkles, Zap, Shield, CheckCircle } from "lucide-react";

const Home = () => {
  const [floatingCardTitle, setFloatingCardTitle] = useState("Fullstack Dev");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const generateTitles = () => {
      const lengthArray = cardTitles.length;
      if (lengthArray > 0) {
        const number = Math.floor(Math.random() * lengthArray);
        setFloatingCardTitle(cardTitles[number]);
      }
    };
    generateTitles();
  }, []);

  return (
    <div className="bg-black/60 text-white relative min-h-screen font-sans selection:bg-purple-500/30">
      <section
        className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden z-10 pt-20"
        id="home"
      >
        {/* Floating Decorative Cards */}
        <motion.div
          {...randomFloat()}
          className="absolute lg:top-32 top-10 lg:left-20 left-4 h-24 w-24 lg:w-32 lg:h-32 rounded-2xl 
               bg-white/5 border border-white/10 shadow-2xl 
               backdrop-blur-xl hidden md:flex flex-col overflow-hidden z-20"
        >
          <img src={cat} alt="AI Art" className="w-full h-1/2 object-cover" />
          <div className="flex-1 p-2 text-[10px] lg:text-xs">
            <p className="font-bold text-purple-400">AI ART</p>
            <p className="text-gray-400">Generated in seconds ✨</p>
          </div>
        </motion.div>

        <motion.div
          {...randomFloat()}
          className="absolute lg:top-40 top-20 lg:right-16 right-4 w-28 h-28 lg:w-40 lg:h-36 rounded-2xl 
               bg-gradient-to-br from-purple-500/10 to-blue-500/10 
               border border-white/10 shadow-2xl backdrop-blur-xl 
               hidden md:flex flex-col p-3 z-20"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-400" />
            <p className="font-semibold text-xs text-white">AI Chat</p>
          </div>
          <div className="mt-1 flex-1 bg-black/40 p-2 rounded-lg border border-white/5">
            <p className="text-[10px] text-gray-300 leading-tight">
              "How can I help you today?"
            </p>
          </div>
        </motion.div>

        <motion.div
          {...randomFloat()}
          className="absolute lg:bottom-24 bottom-10 lg:left-32 left-8 w-32 h-32 rounded-2xl 
               bg-white/5 border border-white/10 shadow-2xl 
               backdrop-blur-xl p-3 hidden md:flex flex-col z-20"
        >
          <p className="font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-2">
            Resume
          </p>
          <ul className="space-y-1.5">
            {RESUME_POINTS.map((point) => (
              <li
                key={point.id}
                className="flex items-center gap-1.5 text-[10px] text-gray-300 font-medium"
              >
                <CheckCircle size={10} className="text-emerald-400" />
                {point.title}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...randomFloat()}
          className="absolute lg:bottom-28 bottom-12 lg:right-32 right-8 w-32 h-32 rounded-2xl 
               bg-white/5 border border-white/10 shadow-2xl 
               backdrop-blur-xl hidden md:flex flex-col items-center justify-center text-white text-xs z-20"
        >
          <img
            src={user?.imageUrl || photo}
            alt="Profile"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full border-2 border-blue-400 mb-2"
          />
          <p className="font-semibold">
            {user?.displayName?.split(" ")[0] ||
              user?.fullname?.split(" ")[0] ||
              "Biswajit"}
          </p>
          <p className="text-gray-400">{floatingCardTitle}</p>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Zap size={14} className="text-purple-400 fill-purple-400" />
              Next Generation AI Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight"
          >
            Unleash Your <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Creative Vision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-gray-400 max-w-3xl font-medium leading-relaxed"
          >
            Experience the future of content creation. Generate breathtaking
            art, intelligent chat experiences, and professional resumes with our
            all-in-one AI-powered creative engine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center gap-3 transition-all duration-300 transform active:scale-95 cta-btn"
              onClick={() =>
                user ? navigate("/dashboard") : navigate("/login")
              }
            >
              {user ? "Explore Dashboard" : "Get Started Now"}
              <Rocket
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
            <button
              onClick={() => navigate("/showcase")}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-white transition-all duration-300"
            >
              View Showcase
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 md:gap-8">
          {[
            { label: "AI Images", value: "1.2M+" },
            { label: "Active Users", value: "85K+" },
            { label: "Bot Messages", value: "4.5M+" },
            { label: "Satisfaction", value: "99%" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-5xl lg:text-7xl font-black mb-4 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 font-black uppercase tracking-[0.4em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Home;
