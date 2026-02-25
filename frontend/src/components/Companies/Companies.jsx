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
// const Companies = () => {
//   return (
//     <div className="overflow-hidden w-full h-full relative mx-auto select-none bg-black/60 mb-4">
//       <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#140029] to-transparent"></div>

//       <div className="marquee-inner flex will-change-transform min-w-[200%] animate-marquee whitespace-nowrap">
//         <div className="flex py-4">{logoList()}</div>
//       </div>
//       <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#140029] to-transparent"></div>
//     </div>
//   );
// };

const Companies = () => {
  return (
    <div className="w-full overflow-hidden transition-opacity duration-500 bg-black/60 py-12 border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_60%)]"></div>
      </div>
      <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-[0.3em] mb-12">
        Trusted by Forward-Thinking Teams
      </p>
      <div className="marquee">
        <div className="marquee-content gap-24 items-center">
          {/* {LOGOS.map((logo, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: logo }}
              className="grayscale hover:grayscale-0 transition-all duration-300 scale-100 flex-shrink-0"
            />
          ))}
          {LOGOS.map((logo, index) => (
            <div
              key={`dup-${index}`}
              dangerouslySetInnerHTML={{ __html: logo }}
              className="grayscale hover:grayscale-0 transition-all duration-300 scale-100 flex-shrink-0"
            />
          ))} */}
          {logoList()}
        </div>
      </div>
    </div>
  );
};

export default Companies;
