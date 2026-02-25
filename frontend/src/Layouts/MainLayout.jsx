import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollableContainerRef = useRef(null);
  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollTop > 30) {
        console.log("success");
        setIsScrolled(true);
      } else setIsScrolled(false);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={scrollableContainerRef}
      className="h-screen w-screen relative overflow-x-hidden overflow-y-auto bg-black"
    >
      <div>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_60%)]"></div>
        </div>
        <NavBar isScrolled={isScrolled} />
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
