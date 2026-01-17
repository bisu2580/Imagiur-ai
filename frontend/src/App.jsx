import Features from "./pages/Features/Features";
import Gallery from "./pages/Gallery/Gallery";
import { Toaster } from "react-hot-toast";
import Pricing from "./pages/Pricing/Pricing";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import MainLayout from "./Layouts/MainLayout";
import DashboardLayout from "./Layouts/DashBoardLayout";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Companies from "./components/Companies/Companies";
import OverviewSection from "./pages/Dashboard/OverViewSection";
import Generate from "./pages/Dashboard/Generate";
import GenerateText from "./pages/Dashboard/GenerateText";
import PricingSection from "./pages/Dashboard/PricingSection";
import ResumeBuilder from "./pages/Dashboard/ResumeBuilder";
import UserDetailsSection from "./pages/Dashboard/UserDetailsSection";
import YoutubeSummerizer from "./pages/Dashboard/YoutubeSummerizer";
import Portfolio from "./components/Portfolio";
function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
              <Companies />
              <Features />
              <Gallery />
              <Pricing />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewSection />} />
          <Route path="image-generate" element={<Generate />} />
          <Route path="chat-with-ai" element={<GenerateText />} />
          <Route path="pricing" element={<PricingSection />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="youtube-summerizer" element={<YoutubeSummerizer />} />
          <Route path="user-details" element={<UserDetailsSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
