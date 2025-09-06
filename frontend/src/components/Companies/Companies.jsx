import { LOGOS } from "../../data";
import "./companies.css";
const repeatedLogos = [...LOGOS, ...LOGOS];
const logoList = () => {
  return repeatedLogos.map((logo, index) => (
    <div key={index}>
      <div dangerouslySetInnerHTML={{ __html: logo }} />
    </div>
  ));
};
const Companies = () => {
  return (
    <div className="overflow-hidden w-full h-full relative mx-auto select-none bg-black/60 mb-4">
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#140029] to-transparent"></div>

      <div className="marquee-inner flex will-change-transform min-w-[200%] animate-marquee whitespace-nowrap">
        <div className="flex py-4">{logoList()}</div>
      </div>
      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#140029] to-transparent"></div>
    </div>
  );
};

export default Companies;
