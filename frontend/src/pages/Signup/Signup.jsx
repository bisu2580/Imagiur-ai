import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import fox from "../../assets/fox.png";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { auth } from "../../config/firebase";

import { Eye, EyeClosed, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  const finalSignUp = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.fullname,
      });

      await sendEmailVerification(user, {
        url: `${window.location.origin}/verify-email`,
        handleCodeInApp: true,
      });

      toast.success("Verification email sent! Please check your inbox.");
      console.log("User created and verification email sent:", user);

      setUserEmail(formData.email);
      setShowVerificationMessage(true);
    } catch (error) {
      console.error("Error creating user:", error);
      let errorMessage = "Failed to create user. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please use a different email or try logging in.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please enter a valid email.";
      }
      setError({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setError({ general: "" });
        alert("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      console.error("Error resending verification:", error);
      setError({
        general: "Failed to resend verification email. Please try again.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error[name]) {
      setError({
        ...error,
        [name]: "",
      });
    }
  };
  const passwordInputType = seen ? "text" : "password";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setError(validateErrors);
    } else {
      setError({});
      console.log("Form submitted successfully", formData);
      finalSignUp();
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
      {showVerificationMessage ? (
        <div className="bg-gray-900/75 rounded-3xl shadow-lg overflow-hidden flex max-w-4xl w-full mx-auto mt-10 mb-6 border border-blue-500/30 z-10">
          <div className="bg-gradient-to-b from-[#4B6BFB] to-[#5A67D8] text-white p-10 flex flex-col justify-center w-1/2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-white rounded-full w-6 h-6"></div>
              <span className="font-semibold text-lg">Storage</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Almost there!</h2>
            <p className="text-white/80">
              We've sent a verification email to confirm your account
            </p>
            <div className="mt-8">
              <div className="text-6xl text-center">📧</div>
            </div>
          </div>

          <div className="p-10 flex flex-col justify-center w-1/2 text-white bg-gray-900">
            <h2 className="text-3xl font-bold mb-6 text-gray-300">
              Check Your Email
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">
                  Verification Email Sent!
                </h3>
                <p className="text-gray-300 text-sm">
                  We've sent a verification email to{" "}
                  <strong>{userEmail}</strong>
                </p>
              </div>

              <div className="text-gray-400 text-sm">
                <p>
                  Please check your email and click the verification link to
                  complete your registration.
                </p>
              </div>

              <div className="space-y-3 mt-6">
                <button
                  onClick={resendVerificationEmail}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Resend Verification Email
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Go to Login
                </button>

                <button
                  onClick={() => {
                    setShowVerificationMessage(false);
                    setFormData({
                      fullname: "",
                      username: "",
                      email: "",
                      password: "",
                    });
                  }}
                  className="w-full text-gray-400 underline text-sm hover:text-gray-300 cursor-pointer"
                >
                  Back to Sign Up
                </button>
              </div>

              {error.general && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-4">
                  <p className="text-red-300 text-sm">{error.general}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="bg-gray-900/75 rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full mx-auto mt-10 mb-6 border border-blue-500/30 hover:border-blue-500/50 transition-all ease-in-out duration-200"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gradient-to-b from-[#4B6BFB] to-[#5A67D8] text-white p-10 hidden md:flex flex-col justify-center w-full md:w-1/2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-white rounded-full w-6 h-6"></div>
              <span className="font-semibold text-lg">Storage</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Manage your files the best way
            </h2>
            <p className="text-white/80">
              Awesome, we've created the perfect place for you to store all your
              images and credits
            </p>
            <div className="mt-8">
              <img src={fox} alt="Files" className="w-32 md:w-44 mx-auto" />
            </div>
          </div>

          <div
            className="p-10 flex flex-col justify-center w-full md:w-1/2 text-white relative backdrop-blur-md overflow-hidden shadow-lg cursor-pointer bg-gray-900"
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <div
              className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${
                visible ? "opacity-30" : "opacity-0"
              }`}
              style={{ top: position.y - 120, left: position.x - 120 }}
            />

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

            <h2 className="text-3xl font-bold mb-6 text-gray-300 relative z-10">
              Sign Up
            </h2>

            {error.general && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4 relative z-10">
                <p className="text-red-300 text-sm">{error.general}</p>
              </div>
            )}

            <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="text-gray-400">
                <input
                  type="text"
                  name="fullname"
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    error.fullname ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent`}
                  value={formData.fullname}
                />
                {error.fullname && (
                  <p className="text-red-500 text-sm mt-1">{error.fullname}</p>
                )}
              </div>

              {/* Username */}
              <div className="text-gray-400">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    error.username ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent`}
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {error.username && (
                  <p className="text-red-500 text-sm mt-1">{error.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="text-gray-400">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    error.email ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {error.email && (
                  <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="text-gray-400">
                <div className="relative">
                  <input
                    type={passwordInputType}
                    placeholder="Password"
                    name="password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      error.password ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10 bg-transparent`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span
                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={() => setSeen(!seen)}
                  >
                    {seen ? <EyeClosed /> : <Eye />}
                  </span>
                </div>
                {error.password && (
                  <p className="text-red-500 text-sm mt-1">{error.password}</p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={` flex items-center justify-center w-full py-3 rounded-lg transition ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                } text-white`}
              >
                {isLoading ? (
                  <span className="flex gap-2 items-center">
                    Creating Account <ClipLoader color="#afa3a3" size={25} />
                  </span>
                ) : (
                  "Sign Up"
                )}
                {/* {isLoading ?  : null} */}
              </button>
            </form>

            <div className="mt-4 text-center relative z-10">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Signup;
