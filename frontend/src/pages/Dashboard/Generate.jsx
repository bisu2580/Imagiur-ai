import {
  Loader2,
  Wand2,
  ImageIcon,
  Sparkles,
  Coins,
  Infinity,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { STYLES } from "../../data";
import { useAuth } from "../../hooks/useAuth";
import { generateImage } from "../../utils/imageService";

const Generate = () => {
  const { user } = useAuth();
  const credits = user?.credits ?? 0;
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [model, setModel] = useState("anime");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const resolution = "512x512";
    if (!user) {
      toast.error("You must be logged in to generate an image.");
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }
    if (credits <= 0 && user.plan !== "UNLIMITED") {
      toast.error("You Have No Credits Left");
      setError("You have no credits left.");
      return;
    }
    setLoading(true);
    setImageUrl("");
    setError("");
    try {
      const result = await generateImage(prompt, model);
      const { imageData } = result;
      if (imageData) {
        setPrompt("");
        setImageUrl(imageData);
        toast.success("Image generated successfully");
      } else {
        setError("Failed to generate image. No data received.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white/5 shadow-xl shadow-black/30 backdrop-blur rounded-2xl min-h-screen">
      <div className="p-1 md:p-6 text-white w-full mx-auto" id="generate">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/5 flex flex-col gap-6 bg-black/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-wide mb-4">
                Create Your Vision
              </h2>
              <div className="flex flex-col gap-3">
                <textarea
                  rows={5}
                  className="w-full p-4 bg-gray-900/70 border border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/40 transition-shadow duration-300 focus:shadow-lg focus:shadow-purple-500/20 placeholder:text-sm"
                  placeholder="A synthwave portrait of a cat wearing sunglasses..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || (user?.plan!=="UNLIMITED" && credits <= 0 )|| !prompt.trim()}
                  className="flex items-center justify-center px-6 py-3 text-md font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2" /> Generate
                    </>
                  )}
                </button>
                <p className=" text-sm md:text-md flex items-center  gap-4 md:gap-2 text-gray-300">
                  Each Generation costs:
                  <span className="flex items-center gap-1 bg-yellow-500/20 text-amber-400 px-2 py-1 rounded-lg font-semibold shadow-sm">
                    1 Credit <Coins className="w-4 h-4 text-amber-400" />
                  </span>
                </p>
              </div>
              {error && (
                <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-center text-sm">
                  {error}
                </div>
              )}
            </div>
            <hr className="border-white/10" />
            <div>
              <h3 className="text-md font-semibold mb-3 text-gray-300">
                Fine-Tune
              </h3>
              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="mb-2 font-medium text-gray-400 text-sm">
                    Style
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {STYLES.map((style) => (
                      <button
                        key={style}
                        onClick={() => setModel(style.toLowerCase())}
                        className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                          model === style.toLowerCase()
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white font-semibold shadow-md"
                            : "bg-gray-800/50 border-gray-600 hover:border-purple-500 hover:bg-gray-700/50"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 text-gray-300">
                <Coins className="text-amber-400" size={20} />
                <span className="font-medium">Credits Left</span>
              </div>
              <span className="text-xl text-amber-400 font-bold">
                {user?.plan === "UNLIMITED" ? <Infinity /> : credits}
              </span>
            </div>
            {credits <= 0 && user?.plan !== "UNLIMITED" && (
              <p className="text-xs text-amber-400 text-center -mt-3">
                Buy more credits to generate image!!
              </p>
            )}
          </div>

          <div
            className={`w-full lg:w-3/5 flex justify-center items-center bg-black/10 backdrop-blur-md rounded-2xl p-4 min-h-[500px] lg:min-h-0 shadow-2xl transition-all duration-300
          ${
            loading
              ? "border-2 border-purple-500/50 animate-pulse"
              : "border border-white/10"
          }`}
          >
            {loading ? (
              <div className="flex flex-col items-center text-center">
                <div className="loader border-4 border-t-transparent border-purple-500 rounded-full w-12 h-12 animate-spin"></div>
                <p className="mt-4 text-white/70">
                  Conjuring your masterpiece...
                </p>
                <p className="text-xs text-white/40 mt-1">
                  This can take a moment
                </p>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="AI Output"
                className="rounded-lg max-w-full max-h-full object-contain shadow-lg shadow-black/40"
              />
            ) : (
              <div className="text-center text-gray-500 flex flex-col items-center gap-4">
                <ImageIcon size={80} strokeWidth={1} />
                <p className=" text-md md:text-lg">
                  Your generated image will appear here
                </p>
                <p className="text-sm max-w-xs text-gray-600">
                  Enter a prompt and select your style to begin the magic.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generate;
