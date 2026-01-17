import React, { useState } from "react";
import toast from "react-hot-toast";
import Card from "./Card";
import SectionTitle from "./SectionTitle";
// import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const YoutubeSummerizer = () => {
  // const { user } = useAuth();
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [bulletSummary, setBulletSummary] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fake API (replace with backend call later)
  const getSummary = async () => {
    const user=auth.currentUser;
    if (!user) {
      toast.error("Please login first to use this feature.");
      navigate("/login");
      return;
    }
    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      toast.error("Enter valid YouTube URL");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const idToken=await user.getIdToken();
      const res = await fetch("/api/summerize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        toast.error(data.error);
        setLoading(false);
        return;
      }
      console.log(data);
      setVideoTitle(data.title);
      setSummary(data.summary);
      setBulletSummary(data.bullet_points || []);
      setThumbnail(data.thumbnail);
      toast.success("Summary generated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to summerize!!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download PDF
  const downloadPDF = () => {
    const content = `
Video Title: ${videoTitle}

Summary:
${summary}

Bullet Points:
${bulletSummary.map((b) => `• ${b}`).join("\n")}
`;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "video-summary.pdf";
    a.click();
  };

  return (
    <div className="space-y-6 relative">
      <SectionTitle
        title="Youtube Video Summarizer"
        subtitle="Summarize YouTube video from link"
      />
      <Card className="min-h-screen">
        {/* Input Card */}
        <div className="mt-16 w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-6 transition hover:shadow-red-500/10 hover:scale-[1.01] mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Enter YouTube Video URL
          </h2>

          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=XXXX"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-red-500 transition"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <button
            onClick={getSummary}
            disabled={loading}
            className="mt-5 w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 disabled:bg-gray-700 shadow-lg transition"
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </div>

        {/* Summary Card */}
        {summary && (
          <div className="mt-10 w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 animate-fadeIn mx-auto space-y-4">
            {/* Thumbnail & Title */}
            <div className="flex items-center gap-4">
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-32 h-20 object-cover rounded-lg border border-white/10"
              />
              <h2 className="text-xl font-bold text-red-400">{videoTitle}</h2>
            </div>

            <h3 className="text-lg font-semibold">Summary</h3>
            <p className="text-gray-300 leading-7">{summary}</p>

            <h3 className="text-lg font-semibold mt-4">Key Bullet Points</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {bulletSummary.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <button
              onClick={downloadPDF}
              className="mt-5 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg transition"
            >
              Download PDF
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default YoutubeSummerizer;
