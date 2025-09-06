import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import photo from "../../assets/photo.png";

const Footer = () => {
  const handleLinkClick = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="bg-black/60 text-gray-300 pt-12 px-6 relative">
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)]" />
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Imagiur</h2>
          <p className="text-gray-400 leading-relaxed">
            Turn your imagination into reality with our AI-powered image
            generator. Fast, creative, and always evolving.
          </p>
        </div>

        {/* Quick Links */}
        <div className="z-20">
          <h3 className="text-base lg:text-lg font-semibold mb-3 text-white">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#gallery"
                className="hover:text-blue-500 transition"
                onClick={() => handleLinkClick("gallery")}
              >
                Gallery
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-blue-500 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-blue-500 transition">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="z-20">
          <h3 className="text-base lg:text-lg font-semibold mb-3 text-white">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://pollinations.ai"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
              >
                Pollinations API
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center z-20">
          <div className="bg-[#1a1f2e] border border-gray-700 rounded-2xl shadow-lg p-3 w-full max-w-4xl flex flex-col justify-center items-center gap-4 hover:shadow-purple-500/20 transition">
            <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden border-2 border-blue-500 shadow-md hover:scale-110 transition-all duration-200">
              <img
                src={photo}
                alt="Developer Avatar"
                className="w-full h-full object-fill"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left flex flex-col relative items-center lg:items-start">
              <div className="flex flex-col gap-1 mx-auto items-center max-w-[85%]">
                <h3 className="text-lg lg:text-base font-semibold text-white">
                  Biswajit Sahoo
                </h3>
                <p className="text-gray-400 text-sm text-wrap text-center">
                  FullStack Developer 💻 • Tech Explorer 🚀
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center gap-2 mt-3 text-gray-400 text-sm mx-auto">
                <a
                  href="mailto:biswajitsahoo1424@gmail.com"
                  className="flex items-center gap-3 hover:text-cyan-400 transition md:overflow-hidden max-w-[200px]"
                  title="biswajitsahoo1424@gmail.com"
                >
                  <MdEmail className="text-blue-400 flex-shrink-0 size-4" />{" "}
                  <p className="md:truncate md:whitespace-nowrap md:text-ellipsis">
                    biswajitsahoo1424@gmail.com
                  </p>
                </a>
                <a
                  href="tel:+918917470831"
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                  title="+918917470831"
                >
                  <MdPhone className="text-green-400 size-4" /> +91 89174 70831
                </a>
              </div>
              {/* Socials */}
              <div className="flex justify-center md:justify-start gap-4 mt-4 mx-auto">
                {/* Twitter */}
                <a
                  href="https://x.com/sahoobiswajit13"
                  target="_blank"
                  className="group relative flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-white/5 border border-white/10 shadow-lg hover:shadow-blue-500/40 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <FaTwitter className="text-gray-300 group-hover:text-blue-400 text-lg transition" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/biswajit.cpp/"
                  target="_blank"
                  className="group relative flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-white/5 border border-white/10 shadow-lg hover:shadow-pink-500/40 hover:border-pink-400 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <FaInstagram className="text-gray-300 group-hover:text-pink-400 text-lg transition" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/biswajit-sahoo3/"
                  target="_blank"
                  className="group relative flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-white/5 border border-white/10 shadow-lg hover:shadow-blue-600/40 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <FaLinkedin className="text-gray-300 group-hover:text-blue-600 text-lg transition" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/bisu2580"
                  target="_blank"
                  className="group relative flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-white/5 border border-white/10 shadow-lg hover:shadow-gray-400/40 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <FaGithub className="text-gray-300 group-hover:text-gray-200 text-lg transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-800 mt-10 py-4 text-center text-xs text-gray-500">
        &copy; 2025 Imagiur. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
