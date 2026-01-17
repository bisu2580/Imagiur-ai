import { useState } from "react";
import { Menu, X } from "lucide-react";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../components/Modals/Modal";
import UpgradeModal from "../../components/Modals/UpgradeModal";
import toast from "react-hot-toast";
import "./dashboard.css";
import { processPayment } from "../../utils/processPayment";
import { useScript } from "../../hooks/useScript";
import { useAuth } from "../../hooks/useAuth";
import { signOutUser, uploadProfileImage } from "../../utils/userServices";

export default function Dashboard() {
  useScript("https://checkout.razorpay.com/v1/checkout.js");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      toast.error("No file Selected");
      setIsModalOpen(false);
      return;
    }
    setLoading(true);
    setIsModalOpen(false);
    try {
      const result = await uploadProfileImage(file);
      toast.success("Profile photo updated!");
    } catch (error) {
      toast.error(error.message);
      console.error("An error occurred during the upload:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed out successfully.");
    } catch (error) {
      toast.error("Error signing out.");
      console.error("Error signing out:", error);
    }
  };
  const handleConfirmUpgrade = async (selectedAmount) => {
    if (!user) {
      toast.error("Please Sign In or Signup first to upgrade your plan.");
      navigate("/login");
      return;
    }
    processPayment(selectedAmount, user);
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden relative hide-scrollbar">
      {/* Top mobile bar */}
      <div className="menu top-0 z-40 px-4 py-3 border-b border-white/5 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <button
          aria-label="Toggle sidebar"
          className="p-2 rounded-lg hover:bg-white/5"
          onClick={() => setSidebarOpen((s) => !s)}
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <div className="text-sm font-medium">Dashboard</div>
        <div className="w-5" />
      </div>

      <div className="flex flex-1">
        <div className="fixed lg:sticky lg:top-0 h-screen lg:w-72 bg-black/40 backdrop-blur border-r border-white/10 z-40">
          <SideBar
            onSignOut={handleSignOut}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setIsModalOpen={setIsModalOpen}
            loading={loading}
          />
        </div>

        <main className="flex-1 h-screen p-4 md:p-8 overflow-y-auto">
          <Outlet context={{
            handleConfirmUpgrade,
            setSelectedAmount,
            setIsUpgradeModalOpen,
            setIsModalOpen
          }}/>
          {/* {active === "overview" && (
            <OverviewSection handleConfirmUpgrade={handleConfirmUpgrade} />
          )}
          {active === "imageGenerations" && <Generate />}
          {active === "textGenerations" && <GenerateText />}
          {active === "pricing" && (
            <PricingSection
              setSelectedAmount={setSelectedAmount}
              setIsUpgradeModalOpen={setIsUpgradeModalOpen}
              handleConfirmUpgrade={handleConfirmUpgrade}
            />
          )}
          {active === "resume_builder" && <ResumeBuilder />}
          {active === "userDetails" && (
            <UserDetailsSection
              setIsModalOpen={setIsModalOpen}
              loading={loading}
              handleConfirmUpgrade={handleConfirmUpgrade}
            />
          )} */}
        </main>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            onUpload={handleUpload}
          ></Modal>
        )}
        {isUpgradeModalOpen && (
          <UpgradeModal
            isOpen={isUpgradeModalOpen}
            onClose={() => setIsUpgradeModalOpen(false)}
            onConfirmUpgrade={() => handleConfirmUpgrade(selectedAmount)}
          />
        )}
      </div>
    </div>
  );
}
