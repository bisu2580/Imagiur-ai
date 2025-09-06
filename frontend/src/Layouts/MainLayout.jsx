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
      className="h-screen w-screen relative overflow-x-hidden bg-black overflow-y-auto"
    >
      <div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_40%)]"></div>
        </div>
        <NavBar isScrolled={isScrolled} />
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
