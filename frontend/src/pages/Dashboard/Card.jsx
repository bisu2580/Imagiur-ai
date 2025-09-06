const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-white/5 p-5 shadow-xl shadow-black/30 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
