import React from "react";

const SectionTitle = ({ title, subtitle, right }) => {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
};

export default SectionTitle;
