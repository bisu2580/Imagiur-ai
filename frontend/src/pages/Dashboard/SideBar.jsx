import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { sidebar_nav } from "../../data";
import { LogOut, Gauge, Infinity } from "lucide-react";
import { FALLBACK_IMAGE } from "../../constants/images";
import { useAuth } from "../../hooks/useAuth";

const SideBar = ({
  active,
  setActive,
  onSignOut,
  sidebarOpen,
  setSidebarOpen,
  setIsModalOpen,
  loading,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } fixed lg:static z-50 h-[100dvh] sm:w-60 md:w-65 lg:w-72 shrink-0 border-r border-white/5 bg-black lg:bg-black/40 backdrop-blur-xl transition-transform duration-300`}
    >
      {/* Profile */}
      <div className="p-4 md:p-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div
            className="relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 group"
            onClick={() => setIsModalOpen(true)}
          >
            {loading ? (
              <div className="size-10 md:size-14 rounded-full md:rounded-2xl bg-gray-700/50 animate-pulse"></div>
            ) : (
              <div className="size-10 md:size-14 rounded-full md:rounded-2xl ring-2 ring-indigo-500/40 transition-all duration-300 group-hover:ring-indigo-500 overflow-hidden">
                <img
                  src={user?.imageUrl || FALLBACK_IMAGE}
                  alt="User"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold shadow-lg truncate max-w-[50px] md:max-w-[75px]">
              {user?.plan || "Plan"}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-sm truncate font-semibold lg:text-base">
              {user?.fullname || "Full Name"}
            </div>
            <div className="truncate text-xs text-gray-400">
              {user?.email || "Email Id"}
            </div>
          </div>
        </div>

        {/* Credits pill */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 p-2 lg:p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-lg bg-indigo-500/20">
              <Gauge className="size-3.5" />
            </span>
            <span className="text-xs lg:text-sm">Credits</span>
          </div>
          <div className="text-xs lg:text-sm font-semibold text-indigo-300">
            {user?.plan === "UNLIMITED" ? (
              <Infinity className="w-5 h-5" />
            ) : (
              <>{user?.credits ?? "0"}</>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 relative">
        {sidebar_nav.map(({ id, label, icon: Icon }) => {
          const activeState = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => {
                setActive(id);
                setSidebarOpen(false);
              }}
              whileHover={{ scale: 1.01 }}
              className={`group flex items-center gap-3 rounded-xl px-4 py-2 lg:py-3 text-left transition-colors ${
                activeState
                  ? "bg-gradient-to-r from-indigo-600/70 to-purple-600/60 text-white"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              <Icon
                className={`size-5 transition-transform duration-200 ${
                  activeState ? "scale-105" : "group-hover:scale-110"
                }`}
              />
              <span className="truncate text-xs lg:text-sm font-medium">
                {label}
              </span>
            </motion.button>
          );
        })}
      </nav>
      <div className="mt-2 p-2 lg:p-4">
        <button
          onClick={onSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/80 px-4 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold shadow-lg shadow-red-900/30 transition hover:bg-red-500"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
      <div className="flex p-2 lg:p-4">
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.01 }}
          className={`flex items-center justify-center gap-3 rounded-xl px-4 py-2 lg:py-2.5 text-center transition-colors bg-gradient-to-r from-indigo-600/70 to-purple-600/60 text-white hover:bg-white/4 hover:text-gray-300 w-full self-center`}
        >
          <LogOut className="size-4 lg:size-5 transition-transform duration-200 hover:scale-110" />
          <span className="truncate text-xs lg:text-sm font-medium">
            Go to Home
          </span>
        </motion.button>
      </div>
    </aside>
  );
};

export default SideBar;
