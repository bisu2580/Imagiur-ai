import Avatar from "../Avatar/Avatar";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserMenu from "../UserMenu/UserMenu";
import logo from "../../assets/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu, Rocket } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { signOutUser } from "../../utils/userServices";

const NavBar = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navLinks = ["Home", "Features", "Gallery", "Pricing"];
  const handleMobileLinkClick = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };
  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
      toast.success("Signed out successfully.");
    } catch (error) {
      toast.error("Error signing out.");
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      <motion.nav
        animate={{
          width: isScrolled ? "70%" : "90%",
          borderRadius: isScrolled ? "3rem" : "1rem",
          marginTop: isScrolled ? "0.75rem" : "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-30 backdrop-blur-xl border border-white/10 shadow-lg px-4 sm:px-8 py-3 flex items-center justify-between gap-2"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-9 w-9 rounded-full" />
          <span className="sm:text-base md:text-base lg:text-lg font-bold text-white tracking-wide">
            Imagiur
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`text-gray-300 hover:text-white transition-colors text-base font-medium ${
                  isScrolled && "lg:text-sm"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shine-button relative hidden md:inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40"
              onClick={() => navigate("/login")}
            >
              <Rocket size={18} />
              <span>Get Started</span>
            </motion.button>
          ) : (
            <div className={`welcome-pill text-sm hidden lg:flex`}>
              <p>
                Welcome,{" "}
                {user?.fullname.split(" ")[0] ||
                  user?.username.split(" ")[0] ||
                  "User"}
              </p>
            </div>
          )}
          {user && (
            <div className="relative hidden md:block">
              <div onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <Avatar user={user} />
              </div>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <UserMenu
                    setIsOpen={setIsUserMenuOpen}
                    handleSignout={handleSignOut}
                  />
                )}
              </AnimatePresence>
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white z-50" // z-20 to be above the menu bg
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen pt-24 p-8 bg-black/90 backdrop-blur-2xl flex flex-col gap-6 md:hidden rounded-2xl border-1 border-white/30 z-40"
          >
            {/* Mobile Navigation Links */}
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => handleMobileLinkClick(item.toLowerCase())}
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium text-center"
              >
                {item}
              </a>
            ))}

            <div className="border-t border-white/20 pt-6 mt-4 flex flex-col items-center gap-4">
              {user ? (
                // --- Logged-in user options for mobile ---
                <>
                  <div className="flex items-center gap-3">
                    <Avatar user={user} />
                    <div>
                      <p className="font-semibold text-white">
                        {user.fullname || user.username || "User Name"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {user.email || "Email Id"}
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full max-w-xs text-center text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium bg-white/10 hover:bg-white/20"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full max-w-xs text-center text-red-400 px-4 py-2.5 rounded-lg text-sm font-medium bg-red-500/10 hover:bg-red-500/20"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </>
              ) : (
                // --- Logged-out user option for mobile ---
                <a
                  href="/login"
                  className="w-full max-w-xs text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg shadow-lg text-base font-medium"
                >
                  Get Started
                </a>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
};
export default NavBar;
