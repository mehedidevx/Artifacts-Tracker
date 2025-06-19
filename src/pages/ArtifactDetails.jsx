import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const ArtifactDetails = () => {
  const artifact = useLoaderData();
  const currentUser = { email: "mehedi.devx@gmail.com" }; // Replace with actual auth user
  const [interested, setInterested] = useState(false);
  const [likeCount, setLikeCount] = useState(artifact.likeCount || 0);
  const API_BASE = "http://localhost:3000";

  useEffect(() => {
    //Check if already liked by this user
    if (currentUser?.email) {
      axios
        .get(`${API_BASE}/likedArtifacts?userEmail=${currentUser.email}`)
        .then((res) => {
          const liked = res.data.find((item) => item.artifactId === artifact._id);
          if (liked) setInterested(true);
        })
        .catch((err) => console.error(err));
    }
  }, [artifact._id, currentUser.email]);

  const toggleInterest = async () => {
    if (artifact.email === currentUser.email) {
      toast.error("❌ You cannot like your own post!");
      return;
    }

    const likeData = {
      artifactId: artifact._id,
      userEmail: currentUser.email,
      artifactName: artifact.name,
      image: artifact.image,
      description: artifact.description,
      createdAt: artifact.createdAt,
      presentLocation: artifact.presentLocation,
      likeCount: artifact.likeCount || 0,
    };

    if (!interested) {
      try {
        const res = await axios.post(`${API_BASE}/likedArtifacts`, likeData);
        if (res.data.insertedId) {
          setInterested(true);
          setLikeCount((prev) => prev + 1);
          await axios.patch(`${API_BASE}/artifacts/${artifact._id}/like`);
          toast.success("🎉 You're now marked as interested.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to like.");
      }
    } else {
      try {
        await axios.delete(`${API_BASE}/likedArtifacts/${artifact._id}?userEmail=${currentUser.email}`);
        setInterested(false);
        setLikeCount((prev) => prev - 1);
        await axios.patch(`${API_BASE}/artifacts/${artifact._id}/unlike`);
        toast.success("❌ Interest removed.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to unlike.");
      }
    }
  };

  return (
    <div className="min-h-150 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-12 px-4 md:px-10">
      <div className="container mx-auto rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-[#1E293B]">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={artifact.image}
            alt={artifact.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 md:p-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300">{artifact.name}</h1>
          <p className="text-sm text-white/70">
            Collection of terracotta sculptures depicting the armies of Qin Shi Huang.
          </p>

          {/* Artifact Metadata */}
          <div className="bg-white/5 rounded-lg p-4 text-sm space-y-2 border border-white/10">
            <p><span className="font-semibold text-white/90">Type:</span> {artifact.type || "N/A"}</p>
            <p><span className="font-semibold text-white/90">Created At / Period:</span> {artifact.createdAt || "N/A"}</p>
            <p><span className="font-semibold text-white/90">Present Location:</span> {artifact.presentLocation || "N/A"}</p>
            <p><span className="font-semibold text-white/90">Discovered At:</span> {artifact.discoveredAt || "N/A"}</p>
            <p><span className="font-semibold text-white/90">Discovered By:</span> {artifact.discoveredBy || "N/A"}</p>
            <p><span className="font-semibold text-white/90">Added By:</span> {artifact.name || "N/A"} ({artifact.email})</p>
            <p className="flex gap-2 items-center">
              <span className="font-semibold flex items-center gap-2 text-white/90 ">
                <FaHeart /> Likes:
              </span>{" "}
              {likeCount}
            </p>
          </div>

          {/* Interest Button */}
          <button
            onClick={toggleInterest}
            className={`w-full py-3 rounded-lg text-center font-semibold transition mt-4 flex justify-center items-center gap-2 ${
              artifact.email === currentUser.email
                ? "bg-gray-600 cursor-not-allowed"
                : interested
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
            }`}
            disabled={artifact.email === currentUser.email}
          >
            <FaHeart className="text-lg" />
            {artifact.email === currentUser.email
              ? "You can't like your own post"
              : interested
              ? "Unlike"
              : "I'm Interested!"}
          </button>

          {/* Contact Info */}
          {interested && (
            <div className="mt-6 bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="text-lg font-semibold mb-2 text-white">Contact Information</h2>
              <p className="text-white font-mono text-lg">{artifact.contact}</p>
              <p className="text-white/60 text-xs mt-1">
                Please be respectful and responsible when contacting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
