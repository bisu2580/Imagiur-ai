import React, { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import fox from "../../assets/fox.png";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import axios from "axios";
import "./login.css";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Eye, EyeClosed, LogOut } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [seen, setSeen] = useState(false);
  const divRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState({});

  const passwordInputType = seen ? "text" : "password";

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const finalSignIn = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await user.reload();
      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }
      const token = await user.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Signin Successful...");
      navigate("/");
    } catch (error) {
      console.error(`Error signin user: ${error.message}`);
      toast.error(error.message || "Failed to sign in. Please try again.");
      setError({ general: "Failed to log in user. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
      return;
    }
    setError({});
    finalSignIn();
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      if (result?.user) {
        const user = result.user;
        let photoURL = user?.photoURL;
        if (photoURL) {
          photoURL = photoURL.split("=")[0] + "?sz=256";
        }
        const idToken = await user?.getIdToken();
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              displayName: user?.displayName,
              photoURL: photoURL,
            }),
          }
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.error || "Server error during sign-in.");
        }

        const backendResult = await response.json();
        toast.success(backendResult.message || `Welcome, ${user.displayName}!`);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("[Auth] signInWithPopup error:", error);
      toast.error(error.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };
  return (
    <section className="bg-black/95 min-h-screen w-screen overflow-x-hidden flex items-center justify-center relative p-3">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_40%)]"></div>
      </div>
      <motion.div
        className="bg-gray-900/75 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full mx-auto mt-10 mb-6 border border-blue-500/30 hover:border-blue-500/50 transition-all ease-in-out duration-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-gradient-to-b from-[#4B6BFB] to-[#5A67D8] text-white p-8 md:p-10 md:flex flex-col justify-center w-full md:w-1/2 hidden">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-white rounded-full w-6 h-6"></div>
            <span className="font-semibold text-lg">Storage</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Manage your files the best way
          </h2>
          <p className="text-white/80">
            Awesome, we’ve created the perfect place for you to store all your
            images and credits
          </p>
          <div className="mt-8">
            <img src={fox} alt="Files" className="w-32 md:w-44 mx-auto" />
          </div>
        </div>

        <div
          className="p-8 md:p-10 flex flex-col justify-center w-full md:w-1/2 text-white relative backdrop-blur-md overflow-hidden shadow-lg cursor-pointer bg-gray-900"
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <div className="flex absolute top-2 right-2">
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.01 }}
              className={`flex items-center justify-center gap-3 rounded-xl px-4 py-2.5 text-center transition-colors bg-transparent text-gray-400 hover:bg-white/4 hover:text-gray-300 w-full self-center`}
            >
              <LogOut className="size-5 transition-transform duration-200 hover:scale-110" />
              <span className="truncate text-sm font-medium">Go to Home</span>
            </motion.button>
          </div>
          <div
            className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${
              visible ? "opacity-30" : "opacity-0"
            }`}
            style={{ top: position.y - 120, left: position.x - 120 }}
          />
          <h2 className="text-3xl font-bold mb-6 text-gray-300">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`w-full px-4 py-3 rounded-lg border ${
                error.username ? "border-red-500" : "border-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              value={formData.username}
              onChange={handleInputChange}
            />
            {error.username && (
              <p className="text-red-500 text-sm">{error.username}</p>
            )}
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-lg border ${
                error.email ? "border-red-500" : "border-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              value={formData.email}
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
            {/* <!-- Password --> */}
            <div className="relative">
              <input
                type={passwordInputType}
                name="password"
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-lg border ${
                  error.password ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10`}
                value={formData.password}
              />
              <span
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={() => setSeen(!seen)}
              >
                {seen ? <EyeClosed /> : <Eye />}
              </span>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
            {/* <!-- Login Button --> */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition flex gap-3 items-center justify-center"
            >
              {loading ? (
                <>
                  Logging you in <ClipLoader color="#ffffff" size={20} />
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* <!-- Divider --> */}
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span className="h-px w-1/4 bg-gray-200"></span>
              <span>or</span>
              <span className="h-px w-1/4 bg-gray-200"></span>
            </div>

            {/* <!-- Social Login --> */}
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-600 rounded-xl px-4 py-2 hover:bg-gray-800 w-full"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* <!-- Signup Link --> */}
            <p className="text-center text-sm mt-4 flex gap-2 justify-center">
              <span>Don’t have an account?</span>
              <span
                className="text-indigo-500 hover:underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </span>
              {/* </Link> */}
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
export default Login;
