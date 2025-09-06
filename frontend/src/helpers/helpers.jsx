import logo from "../assets/gemini-color.svg";
import ReactMarkdown from "react-markdown";
export const GeminiAvatar = () => (
  <img src={logo} className="size-7" alt="Gemini avatar" />
);
export const GeminiFormattedResponse = ({ text }) => {
  return (
    <div className="prose prose-invert">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};
export const InputField = ({ icon, placeholder, value, onChange, name }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {icon}
    </div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
    />
  </div>
);
