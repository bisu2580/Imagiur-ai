import { useState, useEffect } from "react";
import Card from "./Card";
import { Edit3, Save, Sparkles, Crown, Camera } from "lucide-react";
import toast from "react-hot-toast";
import SectionTitle from "./SectionTitle";
import UpgradeModal from "../../components/Modals/UpgradeModal";
import { useAuth } from "../../hooks/useAuth";
import { generateBio, updateUserProfile } from "../../utils/profileService";
import { FALLBACK_IMAGE } from "../../constants/images";

export default function UserDetailsSection({
  setIsModalOpen,
  loading,
  handleConfirmUpgrade,
}) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [upgradeAmount, setUpgradeAmount] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    bio: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        bio: user.bio || "No bio yet.",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    setError("");
    try {
      const newBio = await generateBio(formData.fullname);
      setFormData((prev) => ({ ...prev, bio: newBio }));
      toast.success("New Bio Generated");
    } catch (err) {
      toast.error(err.message);
      setError("Failed to generate bio. Please try again.");
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!user) {
      setError("User not found.");
      return;
    }
    setIsSaving(true);
    setError("");

    try {
      await updateUserProfile(user.uid, {
        fullname: formData.fullname,
        bio: formData.bio,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError("Failed to save changes.");
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center text-gray-400">Loading user details...</div>
    );
  }

  const isFreePlan = !user.plan || user.plan.toLowerCase() === "free";

  return (
    <div className="space-y-6">
      <SectionTitle
        title="User Details"
        subtitle="Update your profile information"
      />
      <Card>
        <div className="flex flex-col items-center p-6 border-b border-white/10">
          <div className="relative">
            {loading ? (
              <div className="w-25 h-25 md:w-32 md:h-32 rounded-full bg-gray-700/50 animate-pulse"></div>
            ) : (
              <img
                onClick={() => setIsModalOpen(true)}
                src={user?.imageUrl || FALLBACK_IMAGE}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                alt="Profile"
                className="w-25 h-25 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-indigo-500/50"
              />
            )}
            <Camera className="w-6 h-6 bg-indigo-500/50 p-1 rounded-full absolute -bottom-1 right-4" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mt-4">
            {user?.fullname || user?.username || "Username"}
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <p className="text-sm font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
              {user.plan
                ? `${
                    user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
                  } Plan`
                : "Free Plan"}
            </p>
            {isFreePlan && (
              <button
                onClick={() => {
                  setUpgradeAmount(4999);
                  setIsUpgradeModalOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-2 md:px-3 py-1 text-sm font-semibold shadow-lg transition hover:from-indigo-500 hover:to-purple-500"
              >
                <Crown className="w-4 h-4" /> Upgrade
              </button>
            )}
          </div>
        </div>

        <form className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none transition-colors ${
                  isEditing
                    ? "text-white focus:ring-2 focus:ring-indigo-500"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                readOnly={isEditing}
                className={`w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none transition-colors ${
                  isEditing
                    ? "text-white focus:ring-2 focus:ring-indigo-500"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-400"
                >
                  Bio
                </label>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleGenerateBio}
                    disabled={isGeneratingBio}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 disabled:opacity-50 disabled:cursor-wait"
                  >
                    <Sparkles
                      size={14}
                      className={isGeneratingBio ? "animate-spin" : ""}
                    />
                    {isGeneratingBio ? "Generating..." : "✨ Generate Bio"}
                  </button>
                )}
              </div>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm outline-none transition-colors resize-none ${
                  isEditing
                    ? "text-white focus:ring-2 focus:ring-indigo-500"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 pb-2 md:pb-0">
            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-wait"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 md:px-6 md:py-2.5 py-1 rounded-lg transition-colors"
              >
                <Edit3 size={16} />
                Update Details
              </button>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-right mt-2">{error}</p>
          )}
        </form>
      </Card>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onConfirmUpgrade={() => handleConfirmUpgrade(upgradeAmount)}
      />
    </div>
  );
}
