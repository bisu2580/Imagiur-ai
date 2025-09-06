import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Features from "./pages/Features/Features";
import Gallery from "./pages/Gallery/Gallery";
import { Toaster } from "react-hot-toast";
import Pricing from "./pages/Pricing/Pricing";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import MainLayout from "./Layouts/MainLayout";
import DashboardLayout from "./Layouts/DashBoardLayout";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Companies from "./components/Companies/Companies";
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
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
