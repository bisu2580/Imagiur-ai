import React, { useEffect, useMemo, useState } from "react";
import {
  Code,
  Terminal as TerminalIcon,
  Zap,
  Github,
  Linkedin,
  Mail,
  Cpu,
  BookOpen,
  Award,
  Activity,
  Book,
  Calendar,
  GitBranch,
  GitPullRequest,
  Star,
} from "lucide-react";

import profile from "../assets/member1.png";

/**
 * Tailwind version of the final portfolio
 * - Tailwind classes used everywhere
 * - Deterministic gradients per seed (stable)
 * - No global blinking interval in React (blink via CSS)
 * - Hack Nerd Font used via font-family fallback (you must include font files)
 */

/* ---------- gradient palette ---------- */
const gradientMap = [
  ["#ff6b6b", "#f06595"],
  ["#845ef7", "#5c7cfa"],
  ["#339af0", "#22b8cf"],
  ["#20c997", "#94d82d"],
  ["#f59f00", "#f76707"],
  ["#e64980", "#be4bdb"],
  ["#4dabf7", "#9775fa"],
  ["#ff922b", "#ff6b6b"],
  ["#ffd43b", "#ffa94d"],
];

function pickGradientBySeed(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  const idx = s % gradientMap.length;
  const g = gradientMap[idx];
  return `linear-gradient(135deg, ${g[0]}, ${g[1]})`;
}

/* ---------- TerminalCard (Type 3 multi-color header) ---------- */
const TerminalCard = ({ title, color = "#334155", children }) => {
  return (
    <div
      className="rounded-lg overflow-hidden border shadow-md"
      style={{ borderColor: `${color}33` }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ background: color }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 text-sm font-mono text-white">{title}</div>
      </div>
      <div className="p-4 font-mono text-sm text-slate-100">{children}</div>
    </div>
  );
};

/* ---------- RainbowCard (R3 stable) ---------- */
const RainbowCard = ({
  seed = "default",
  className = "",
  children,
  style = {},
}) => {
  const bg = useMemo(() => pickGradientBySeed(seed), [seed]);
  return (
    <div
      className={`rounded-xl p-6 text-white shadow-lg ${className}`}
      style={{
        background: bg,
        boxShadow: "0 6px 30px rgba(0,0,0,0.18)",
        ...style,
      }}
    >
      <div className="font-mono">{children}</div>
    </div>
  );
};

/* ---------- GitHubHeatmap (static) ---------- */
const GitHubHeatmap = ({ weeks = 12, rows = 7, seed = "heatmap" }) => {
  // deterministic pseudo-random based on seed
  const squares = useMemo(() => {
    let s = 0;
    for (let i = 0; i < seed.length; i++)
      s = (s * 31 + seed.charCodeAt(i)) >>> 0;
    const out = [];
    for (let i = 0; i < weeks * rows; i++) {
      s = (s * 1664525 + 1013904223) >>> 0;
      out.push(s % 4); // 0..3
    }
    return out;
  }, [weeks, rows, seed]);

  const colorFor = (v) => {
    if (v === 0) return "bg-slate-800";
    if (v === 1) return "bg-green-700";
    if (v === 2) return "bg-green-500";
    return "bg-green-400";
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="grid gap-1">
          {Array.from({ length: rows }).map((__, r) => {
            const v = squares[w * rows + r];
            return (
              <div key={r} className={`${colorFor(v)} rounded-sm w-2 h-2`} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* ---------- Timeline ---------- */
const Timeline = ({ items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((it, idx) => (
        <div key={idx} className="flex gap-3 items-start">
          <div
            className="min-w-[10px] h-2 rounded-full"
            style={{ background: it.color || "#7c3aed", marginTop: 6 }}
          />
          <div>
            <div className="font-mono font-semibold text-white">{it.title}</div>
            <div className="font-mono text-sm text-slate-300">{it.sub}</div>
            <div className="font-mono text-xs text-slate-400">{it.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- Main Tailwind Component ---------- */
export default function PortfolioTailwind() {
  const [darkMode, setDarkMode] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "const developer = new FullStackEngineer();";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const t = setTimeout(
        () => setTypedText(fullText.slice(0, typedText.length + 1)),
        90
      );
      return () => clearTimeout(t);
    }
  }, [typedText]);

  // stable gradients for projects/skills
  const projectSeeds = useMemo(
    () =>
      ["ecom", "cms", "aichat", "fitness"].map((s) => pickGradientBySeed(s)),
    []
  );
  const skillSeeds = useMemo(
    () =>
      ["js", "react", "node", "py", "mongo", "pg", "docker", "aws"].map((s) =>
        pickGradientBySeed(s)
      ),
    []
  );
  const heroBg = useMemo(() => pickGradientBySeed("hero-biswa"), []);

  const timelineItems = [
    {
      title: "B.Tech — Computer Science",
      sub: "Your College Name",
      date: "2020 — 2024",
      color: "#ae3ec9",
    },
    {
      title: "Software Engineer Intern",
      sub: "Startup X — Frontend & APIs",
      date: "Jun 2023 — Dec 2023",
      color: "#4dabf7",
    },
    {
      title: "Fullstack Projects & Freelance",
      sub: "React / Node / Cloud",
      date: "2024 — Present",
      color: "#f59f00",
    },
  ];

  const skills = [
    { name: "JavaScript", icon: <Code size={18} /> },
    { name: "React", icon: <Zap size={18} /> },
    { name: "Node.js", icon: <TerminalIcon size={18} /> },
    { name: "Python", icon: <Activity size={18} /> },
    { name: "MongoDB", icon: <Cpu size={18} /> },
    { name: "PostgreSQL", icon: <Book size={18} /> },
    { name: "Docker", icon: <BookOpen size={18} /> },
    { name: "AWS", icon: <Award size={18} /> },
  ];

  const languages = [
    { name: "JavaScript", pct: 45, color: "bg-amber-500" },
    { name: "TypeScript", pct: 20, color: "bg-violet-600" },
    { name: "Python", pct: 15, color: "bg-cyan-500" },
    { name: "SQL", pct: 10, color: "bg-emerald-500" },
    { name: "Other", pct: 10, color: "bg-orange-500" },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      tech: "React, Node.js, MongoDB",
      seed: "ecom",
    },
    {
      title: "Portfolio CMS",
      tech: "Next.js, Prisma, PostgreSQL",
      seed: "cms",
    },
    {
      title: "AI Chat Bot",
      tech: "Python, FastAPI, TensorFlow",
      seed: "aichat",
    },
    {
      title: "Mobile Fitness App",
      tech: "React Native, Firebase",
      seed: "fitness",
    },
  ];

  return (
    <div
      className={`min-h-screen p-6 md:p-10 ${
        darkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100"
          : "bg-gradient-to-b from-amber-50 to-rose-50 text-slate-900"
      }`}
      style={{ fontFamily: "Hack, 'Hack Nerd Font', 'Fira Code', monospace" }}
    >
      {/* font-family note (install Hack Nerd Font in production) */}
      <div className="fixed top-3 left-3 text-xs text-slate-400 font-mono">
        Using: <span className="font-semibold">Hack Nerd Font</span> (add to
        /public/fonts or system)
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setDarkMode((s) => !s)}
        className="fixed top-3 right-3 px-3 py-2 rounded-full border shadow-sm font-mono"
        style={{
          borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="max-w-7xl mx-auto grid gap-6">
        {/* HERO + STATUS */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className="flex-1 rounded-xl overflow-hidden"
            style={{ background: heroBg }}
          >
            <div className="p-6 md:p-8 flex items-center gap-6">
              <div className="flex-1">
                <div className="font-mono text-sm text-white mb-2">
                  {">"} ./portfolio.init()
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
                  Hi, I'm Biswa
                </h1>
                <div className="font-mono text-lg text-white mb-4">
                  {typedText}
                  <span className="blink ml-2">|</span>
                </div>
                <p className="text-white/90 max-w-xl">
                  Full-stack developer focused on modern React apps, scalable
                  Node backends, and delightful UX.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md text-sm">
                    <Star size={14} /> 50+ Projects
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md text-sm">
                    <GitBranch size={14} /> Open Source
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md text-sm">
                    <Award size={14} /> CP Enthusiast
                  </span>
                </div>
              </div>

              {/* Profile img: scale on hover only */}
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src={profile}
                  alt="profile"
                  className="w-full h-full object-cover transform transition-transform duration-300"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>
          </div>

          {/* right column: terminal cards */}
          <div className="w-full lg:w-[380px] flex flex-col gap-4">
            <TerminalCard title="status.sh" color="#339af0">
              $ Status:{" "}
              <span className="text-emerald-300">Open to opportunities</span>
              <br />
              $ Mode: Remote / Hybrid / On-site
              <br />
              <br />
              <div className="flex items-center gap-3 text-slate-100">
                <a href="#" className="flex items-center gap-2">
                  <Github /> GitHub
                </a>
                <a href="#" className="flex items-center gap-2">
                  <Linkedin /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2">
                  <Mail /> Mail
                </a>
              </div>
            </TerminalCard>

            <TerminalCard title="coding-stats" color="#f59f00">
              ⭐ LeetCode: 1650+ (250+ solved)
              <br />
              🔥 50-day streak
              <br />
              <br />
              ⭐ GFG Score: 680+ (21 Day POTD)
              <br />
              <br />
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-100">GitHub Activity</div>
                <GitHubHeatmap weeks={12} rows={7} seed="biswa-heat" />
              </div>
            </TerminalCard>
          </div>
        </div>

        {/* timeline + languages */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RainbowCard seed={"timeline"}>
            <h3 className="text-xl font-bold mb-3">Timeline</h3>
            <Timeline items={timelineItems} />
          </RainbowCard>

          <div className="flex flex-col gap-4">
            <RainbowCard seed={"languages"}>
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold">Language Usage</div>
                <div className="text-sm text-white/90">Approx</div>
              </div>
              <div className="space-y-3">
                {languages.map((lg, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-sm ${lg.color}`} />
                        <div className="font-mono">{lg.name}</div>
                      </div>
                      <div className="font-mono">{lg.pct}%</div>
                    </div>
                    <div className="bg-white/10 rounded-full h-2">
                      <div
                        className={`${lg.color} h-2 rounded-full`}
                        style={{ width: `${lg.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </RainbowCard>

            <RainbowCard seed={"badges"}>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-white/10 px-3 py-1 rounded-md font-mono">
                  50+ Projects
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-md font-mono">
                  Open Source
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-md font-mono">
                  Hackathon Winner
                </span>
              </div>
            </RainbowCard>
          </div>
        </div>

        {/* skills grid */}
        <div>
          <h3 className="text-xl font-bold mb-3">Skills & Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  background: skillSeeds[i % skillSeeds.length],
                  color: "#fff",
                }}
              >
                <div className="w-12 h-12 rounded-md grid place-items-center bg-black/20">
                  {s.icon}
                </div>
                <div className="font-mono font-semibold">{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* projects grid */}
        <div>
          <h3 className="text-xl font-bold mb-3">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg"
                style={{
                  background: projectSeeds[idx % projectSeeds.length],
                  color: "#fff",
                }}
              >
                <div className="font-mono font-extrabold text-lg">
                  {p.title}
                </div>
                <div className="mt-2 text-sm">{p.tech}</div>
                <div className="mt-3 font-mono text-sm">{`{> view_details()}`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* additional coder cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <TerminalCard title="cp-stats.log" color="#e64980">
            <div className="mb-2 font-semibold">🏆 CP Score: 2100 (agg)</div>
            <div>✅ 400+ problems across platforms</div>
            <div>⏱ Fastest: solved medium in 18 minutes</div>
          </TerminalCard>

          <RainbowCard seed={"achievements"}>
            <div className="font-semibold mb-2">Achievements</div>
            <ul className="list-disc list-inside text-sm">
              <li>1st Place — University Hackathon</li>
              <li>Published UI library — 1000+ stars</li>
              <li>Speaker: Local Dev Meetups</li>
            </ul>
          </RainbowCard>
        </div>

        {/* footer */}
        <TerminalCard title="footer" color="#4dabf7">
          $ echo "Let's build something amazing together"
          <br />© 2025 Biswa • Built with Hack Nerd Font & Coffee ☕
        </TerminalCard>
      </div>

      {/* blink css (no react setInterval) */}
    </div>
  );
}
