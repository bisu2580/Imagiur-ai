import {
  Crown,
  Download,
  TrendingUp,
  Infinity,
  ImageOff,
  Clock,
} from "lucide-react";
import Card from "./Card";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
import UpgradeModal from "../../components/Modals/UpgradeModal.jsx";
import BuyCreditsModal from "../../components/Modals/BuyCreditsModal.jsx";
import { useAuth } from "../../hooks/useAuth";
import {
  formatTimestamp,
  downloadFileFromUrl,
} from "../../utils/overViewUtils.js";
import { ShimmerActivity, ShimmerImage } from "../../utils/animations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { processPayment } from "../../utils/processPayment.js";

export default function OverviewSection() {
  const { user } = useAuth();
  const [activity, setActivity] = useState([]);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeAmount, setUpgradeAmount] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const imagesArray = user?.activities?.filter(
    (activity) => activity.type === "image_generation"
  );

  const metrics = [
    {
      label: "Credits Remaining",
      value:
        user?.plan === "UNLIMITED" ? (
          <Infinity className="w-12 h-12" />
        ) : (
          user?.credits || "0"
        ),
      accent: "text-indigo-300",
    },
    {
      label: "Images Generated",
      value: imagesArray?.length || 0,
      accent: "text-emerald-300",
    },
    { label: "Plan", value: user?.plan, accent: "text-sky-300" },
  ];
  const fillAngle =
    user?.plan === "UNLIMITED" ? 360 : (user?.credits || 0) * 3.6;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (user?.activities) {
        setActivity([...user.activities].reverse());
      }
      if (user?.generatedImages) {
        setImages(user.generatedImages);
      }
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  const handleConfirmUpgrade = async (selectedAmount) => {
    if (!user) {
      toast.error("Please Sign In or Signup first to upgrade your plan.");
      navigate("/login");
      return;
    }
    processPayment(selectedAmount, user);
    setIsCreditsModalOpen(false);
  };
  return (
    <div className="space-y-8">
      <SectionTitle
        title={`Welcome back, ${user?.fullname?.split(" ")[0] || "User"}`}
        subtitle="Here’s a quick snapshot of your account."
        right={
          user?.plan !== "UNLIMITED" && (
            <button
              onClick={() => {
                setUpgradeAmount(4999);
                setIsUpgradeModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold shadow-lg transition hover:from-indigo-500 hover:to-purple-500"
            >
              <Crown className="w-4 h-4" />
              Upgrade
            </button>
          )
        }
      />

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.map((m) => (
          <Card key={m.label}>
            <div className="text-xs uppercase tracking-wide text-gray-400">
              {m.label}
            </div>
            <div className={`mt-2 text-3xl font-bold ${m.accent}`}>
              {m.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Activity & Recent images */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 h-[450px] flex flex-col">
          <SectionTitle
            title="Recent Activity"
            subtitle="Credits & generations"
          />
          <div className="flex-1 min-h-0">
            {loading ? (
              <ul className="space-y-4 overflow-y-auto h-full custom-scrollbar">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ShimmerActivity key={i} />
                ))}
              </ul>
            ) : activity && activity.length > 0 ? (
              <ul className="space-y-4 overflow-y-auto h-full custom-scrollbar">
                {activity.reverse().map((data, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-3">
                      <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-white/5">
                        <TrendingUp className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-sm font-medium">
                          {data.type === "image_generation"
                            ? `Generated image`
                            : data.type === "purchased_credits"
                            ? "Purchased Credits"
                            : "Profile Photo Updated"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {data.type === "image_generation"
                            ? `-1 credit · model-${data.model}`
                            : data.type === "purchased_credits"
                            ? `+${data.creditsToAdd} credits`
                            : "-0 credit"}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 mr-2">
                      {formatTimestamp(data.timestamp.seconds, "en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 py-8">
                <Clock className="w-10 h-10 text-gray-500 mb-3" />{" "}
                {/* Empty state icon */}
                <p className="text-sm">No activity yet.</p>
              </div>
            )}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Credits Ring" />
          <div className="mx-auto flex w-full max-w-[180px] flex-col items-center">
            <div
              className="relative aspect-square w-full rounded-full"
              style={{
                background: `conic-gradient(#6366f1 ${fillAngle}deg, rgba(255,255,255,0.05) 0)`,
              }}
            >
              <div className="absolute inset-3 rounded-full bg-black/60 backdrop-blur" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-indigo-300">
                    {user?.plan === "UNLIMITED" ? (
                      <Infinity className="size-10" />
                    ) : (
                      user?.credits || 0
                    )}
                  </div>
                  <div className="text-xs text-gray-400">remaining</div>
                </div>
              </div>
            </div>
            {user?.plan !== "UNLIMITED" && (
              <button
                className="mt-5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-indigo-200 hover:bg-white/15"
                onClick={() => setIsCreditsModalOpen(true)}
              >
                Buy credits
              </button>
            )}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Recent Generations"
          subtitle="Your latest outputs"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ShimmerImage key={i} />
              ))}
            </div>
          ) : images && images.length > 0 ? (
            images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5"
              >
                <div className="relative group">
                  <img
                    src={image}
                    alt="generated"
                    className="h-full w-full object-cover rounded-xl transition duration-300 group-hover:opacity-90"
                    loading="lazy"
                  />

                  {/* Download Button */}
                  <button
                    onClick={() =>
                      downloadFileFromUrl(image, `image${index}.png`)
                    }
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/10 backdrop-blur-md shadow-md border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-blue-500/30 hover:shadow-blue-400/40"
                  >
                    <Download className="w-4 h-4 text-blue-300 transition-colors duration-300 group-hover:text-white" />
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center col-span-full py-10">
              <ImageOff className="w-10 h-10 text-gray-500 mb-3" />{" "}
              {/* Empty state icon */}
              <p className="text-gray-400 text-sm">No image Data Available</p>
            </div>
          )}
        </div>
      </Card>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onConfirmUpgrade={() => handleConfirmUpgrade(upgradeAmount)}
      />
      <BuyCreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        onConfirmUpgrade={(amount) => handleConfirmUpgrade(amount)}
      />
    </div>
  );
}
