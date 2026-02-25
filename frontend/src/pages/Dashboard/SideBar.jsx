import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { sidebar_nav } from "../../data";
import { LogOut, Gauge, Infinity, HomeIcon } from "lucide-react";
import { FALLBACK_IMAGE } from "../../constants/images";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png";

const SideBar = ({
  onSignOut,
  sidebarOpen,
  setSidebarOpen,
  setIsModalOpen,
  loading,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (id) => {
    return location.pathname.includes(id);
  };

  return (
    <aside className="h-full w-full flex flex-col bg-[#050505] lg:bg-transparent">
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="sidebar-icon-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-9 w-9 rounded-full" />
          <span className="text-lg font-black tracking-loose text-white">
            IMAGIUR AI
          </span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6">
        <div className="relative p-1 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute -top-10 -right-10 size-20 bg-indigo-500/10 blur-2xl" />

          <div className="relative z-10 p-3 flex items-center gap-4">
            <div
              className="relative cursor-pointer shrink-0"
              onClick={() => setIsModalOpen(true)}
            >
              {loading ? (
                <div className="size-12 rounded-xl bg-zinc-800 animate-pulse"></div>
              ) : (
                <div className="size-12 rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-transform hover:scale-105 active:scale-95">
                  <img
                    src={user?.imageUrl || FALLBACK_IMAGE}
                    alt="User"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 size-4 bg-indigo-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate">
                {user?.fullname || "Explorer"}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                  {user?.plan || "FREE"}
                </span>
              </div>
            </div>
          </div>

          {/* Credits pill */}
          <div className="mt-3 mx-2 mb-2 flex items-center justify-between rounded-xl bg-white/[0.03] p-3 border border-white/5 text-zinc-400">
            <div className="flex items-center gap-2">
              <Gauge className="size-3.5 text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Credits
              </span>
            </div>
            <div className="text-sm font-black text-white">
              {user?.plan === "UNLIMITED" ? (
                <Infinity className="size-4 text-indigo-400" />
              ) : (
                <>{user?.credits ?? "0"}</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto hide-scrollbar">
        <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">
          Navigation
        </p>
        {sidebar_nav.map(({ id, label, icon: Icon }) => {
          const activeState = isActive(id);
          return (
            <button
              key={id}
              onClick={() => {
                navigate(`/dashboard/${id}`);
                setSidebarOpen(false);
              }}
              className={`group w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 relative ${
                activeState
                  ? "bg-white/[0.05] text-white border border-white/10 shadow-lg"
                  : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Icon
                size={20}
                stroke={
                  activeState ? "url(#sidebar-icon-gradient)" : "currentColor"
                }
                className={`transition-all duration-200 ${
                  activeState
                    ? "scale-110"
                    : "group-hover:scale-110 group-hover:text-indigo-400"
                }`}
              />
              <span
                className={`text-sm font-bold transition-transform duration-300 ${
                  activeState ? "translate-x-1" : "group-hover:translate-x-1"
                }`}
              >
                {label}
              </span>

              {activeState && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions / Footer */}
      <div className="p-4 bg-white/[0.02] border-t border-white/5 space-y-1">
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all group"
        >
          <HomeIcon className="size-4 group-hover:text-indigo-400 transition-colors" />
          Return to Site
        </button>
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all group"
        >
          <LogOut className="size-4 group-hover:rotate-12 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
