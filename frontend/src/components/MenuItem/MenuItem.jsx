export const MenuItem = ({ icon, text, onClick, className = "" }) => {
  return (
    <li className="w-full">
      <button
        onClick={onClick}
        className={`flex items-center w-full p-2 rounded-lg text-left transition-colors duration-200 hover:bg-[#2a2a3d] ${className}`}
      >
        <span className="mr-3">{icon}</span>
        <span>{text}</span>
      </button>
    </li>
  );
};
