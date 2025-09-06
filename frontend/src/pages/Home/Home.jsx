import { useNavigate } from "react-router-dom";
import photo from "../../assets/photo.png";
import { motion } from "framer-motion";
import { cardTitles } from "../../data";
import { useEffect, useState } from "react";
import { randomFloat } from "../../utils/animations";
import "./home.css";
import { RESUME_POINTS } from "../../data";
import cat from "../../assets/cat.jpg";
import { useAuth } from "../../hooks/useAuth";
import { Rocket } from "lucide-react";

const Home = () => {
  const [floatingCardTitle, setFloatingCardTitle] = useState("Fullstack Dev");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const generateTitles = () => {
      const lengthArray = cardTitles.length;
      const number = Math.round(Math.random() * lengthArray);
      setFloatingCardTitle(cardTitles[number]);
    };
    generateTitles();
  }, []);

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 bg-black/60 overflow-hidden"
      id="home"
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_40%)]"></div>
      </div>
      {/* AI Image Card */}
      <motion.div
        {...randomFloat()}
        className="absolute md:top-32 top-20 md:left-20 left-10 h-[6.5rem] w-[6.5rem] md:w-[8rem] md:h-[8rem] rounded-2xl 
             bg-white/10 border border-white/10 shadow-lg 
             backdrop-blur-md flex flex-col overflow-hidden text-white"
      >
        <img
          src={cat}
          alt="AI Art"
          className="w-full h-[50%] md:h-[55%] object-cover"
        />
        <div className="flex-1 p-0.5 md:p-1 text-xs h-[45%]">
          <p className="font-bold">AI Art</p>
          <p className="text-gray-400">Generated in seconds🎨</p>
        </div>
      </motion.div>

      {/* Chat Card */}
      <motion.div
        {...randomFloat()}
        className="absolute md:top-40 top-25 md:right-16 right-10 w-25 h-25 md:w-32 md:h-32 rounded-2xl 
             bg-gradient-to-br from-purple-500/30 to-blue-500/30 
             border border-white/10 shadow-lg backdrop-blur-md 
             flex flex-col p-3 text-white text-xs"
      >
        <p className="font-semibold">🤖 AI Chat</p>
        <div className="mt-1 flex-1 bg-black/20 p-2 rounded-lg">
          <p className="text-gray-300">"Hello, how can I help?"</p>
        </div>
      </motion.div>

      {/* Resume Card */}
      <motion.div
        {...randomFloat()}
        className="absolute md:bottom-24 bottom-20 md:left-45 left-10 w-29 h-29 md:w-32 md:h-32 rounded-2xl 
             bg-white/10 border border-white/10 shadow-lg 
             backdrop-blur-md md:p-3 p-2 text-white text-xs flex flex-col"
      >
        <p className="font-bold">🚀 Resume Highlight</p>
        <ul className="mt-1 md:mt-2 space-y-1 text-gray-300">
          {RESUME_POINTS.map((point) => (
            <li key={point.id}>{point.title}</li>
          ))}
        </ul>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        {...randomFloat()}
        className="absolute md:bottom-28 bottom-12 md:right-28 right-10 w-29 h-29 md:w-32 md:h-32 rounded-2xl 
             bg-white/10 border border-white/10 shadow-lg 
             backdrop-blur-md flex flex-col items-center justify-center text-white text-xs"
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight"
        >
          Make{" "}
          <span className="heading bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            stunning AI
          </span>{" "}
          content instantly
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 md:text-lg text-base text-gray-400 max-w-2xl"
        >
          Generate breathtaking images 🎨, chat with powerful AI 🤖, and build
          job-winning resumes 📄 — all in one platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 flex flex-wrap md:gap-4 gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40"
            onClick={() => (user ? navigate("/dashboard") : navigate("/login"))}
          >
            {!user ? (
              <>
                <Rocket size={18} />
                <span>Get Started</span>
              </>
            ) : (
              <>
                <span>Go to Dashboard</span>
                <Rocket size={18} />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
