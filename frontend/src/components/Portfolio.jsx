import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Zap,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Star,
  GitBranch,
  Award,
  Terminal,
  ExternalLink,
  ChevronRight,
  Globe,
  Database,
  Layers,
} from "lucide-react";

import profile from "../assets/member1.png";

const ConsoleCard = ({ title, children, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-colors duration-500" />

    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
          <Icon size={20} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
          {title}
        </h3>
      </div>
      <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
        {children}
      </div>
    </div>
  </motion.div>
);

const SkillBadge = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ y: -2 }}
    className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-300 text-sm font-bold flex items-center gap-2 hover:bg-white/[0.08] hover:border-indigo-500/40 transition-all cursor-default"
  >
    <div className="size-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
    {skill}
  </motion.div>
);

const GitHubHeatmap = ({ weeks = 14 }) => {
  const rows = 7;
  return (
    <div className="flex gap-1.5 p-4 rounded-2xl bg-black/20 border border-white/5">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="grid gap-1.5">
          {Array.from({ length: rows }).map((__, r) => {
            const intensity = Math.random();
            const color =
              intensity > 0.8
                ? "bg-indigo-500"
                : intensity > 0.5
                  ? "bg-indigo-500/60"
                  : intensity > 0.2
                    ? "bg-indigo-500/30"
                    : "bg-white/5";
            return (
              <div
                key={r}
                className={`${color} rounded-sm w-3 h-3 transition-colors duration-500 hover:scale-125 cursor-pointer`}
                title={`${Math.floor(intensity * 10)} contributions`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Building intelligent digital experiences.";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const t = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(t);
    }
  }, [typedText]);

  const projects = [
    {
      title: "E-Commerce Nexus",
      desc: "Full-scale commerce engine with real-time analytics.",
      tech: ["React", "Node.js", "MongoDB", "Redux"],
      icon: Globe,
    },
    {
      title: "AI Chat Logic",
      desc: "Distributed chat system with LLM integration.",
      tech: ["Python", "FastAPI", "TensorFlow", "Redis"],
      icon: Cpu,
    },
    {
      title: "Cloud Resume Builder",
      desc: "Dynamic resume generation with professional templates.",
      tech: ["Next.js", "PostgreSQL", "Tailwind", "AWS"],
      icon: Layers,
    },
    {
      title: "Portfolio Engine",
      desc: "The very site you are exploring right now.",
      tech: ["Framer Motion", "Three.js", "React", "Lucide"],
      icon: Code,
    },
  ];

  const timeline = [
    {
      role: "B.Tech Computer Science",
      org: "Your Institute of Technology",
      date: "2020 — 2024",
      status: "Graduate",
    },
    {
      role: "Software Engineer Intern",
      org: "Innovate AI Labs",
      date: "Jun 2023 — Dec 2023",
      status: "Completed",
    },
    {
      role: "Fullstack Developer",
      org: "Freelance & Projects",
      date: "2024 — Present",
      status: "Active",
    },
  ];

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Framer Motion",
    "Tailwind CSS",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Protfolio v2.4.0
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">
              I'm <span className="text-indigo-500">Biswa</span>
            </h1>

            <div className="text-xl md:text-2xl font-bold text-zinc-400 h-10">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "steps(2)",
                }}
                className="inline-block w-1.5 h-6 bg-indigo-500 ml-2 align-middle"
              />
            </div>

            <p className="mt-8 text-zinc-500 leading-relaxed text-lg max-w-xl">
              Specialized in crafting modern architectural solutions and
              delightful user experiences with a focus on high-performance React
              ecosystems.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                Download CV
              </button>
              <div className="flex items-center gap-2">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 text-zinc-400 hover:text-white transition-all"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative lg:w-96 shrink-0"
          >
            {/* Profile Aura */}
            <div className="absolute inset-0 bg-indigo-600/20 blur-[80px] rounded-full" />

            <div className="relative p-2 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden shadow-2xl">
              <img
                src={profile}
                alt="Biswa"
                className="w-full aspect-square object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-black text-zinc-500 uppercase">
                      Location
                    </p>
                    <p className="text-sm font-bold text-white">
                      Bhubaneswar, IN
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-zinc-500 uppercase">
                      Availability
                    </p>
                    <p className="text-sm font-bold text-emerald-500">High</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ConsoleCard title="Expertise" icon={Zap} delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <SkillBadge key={i} skill={s} index={i} />
              ))}
            </div>
          </ConsoleCard>

          <ConsoleCard title="Activity Log" icon={Terminal} delay={0.2}>
            <GitHubHeatmap />
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold">LeetCode Problem Solved</span>
                <span className="text-white font-black">250+</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-indigo-500" />
              </div>
            </div>
          </ConsoleCard>

          <ConsoleCard title="Career Track" icon={GitBranch} delay={0.3}>
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="size-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      {item.role}
                    </h4>
                    <p className="text-xs text-zinc-500">{item.org}</p>
                    <p className="text-[10px] font-black uppercase text-indigo-400 mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ConsoleCard>

          {/* Project Highlights */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <h2 className="col-span-full text-2xl font-black text-white mt-8 mb-4">
              Featured Shipments
            </h2>
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer"
              >
                <div className="size-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                  <proj.icon size={24} />
                </div>

                <h3 className="text-xl font-black text-white mb-2 leading-tight">
                  {proj.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-6 line-clamp-2">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {proj.tech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-black uppercase text-zinc-600 bg-white/5 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                  <ChevronRight
                    size={14}
                    className="ml-auto text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-32 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white">
              B
            </div>
            <div>
              <p className="text-sm font-black text-white tracking-widest uppercase">
                Biswa Sahoo
              </p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest opacity-50">
                Fullstack Engineer • 2025
              </p>
            </div>
          </div>

          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Dribbble
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
