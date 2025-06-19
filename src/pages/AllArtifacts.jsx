import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeart,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const AllArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = "http://localhost:3000";

  useEffect(() => {
    fetchArtifacts("");
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchArtifacts(searchText);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${API_BASE}/likedArtifacts?userEmail=${user.email}`)
        .then((res) => {
          const ids = res.data.map((item) => item.artifactId);
          setLikedIds(ids);
        })
        .catch((err) => console.error("Liked fetch error", err));
    }
  }, [user]);

  const fetchArtifacts = async (search = "") => {
    setLoading(true); 
    try {
      const res = await axios.get(`${API_BASE}/artifacts?search=${search}`);
      setAllArtifacts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load artifacts.");
    } finally {
      setLoading(false); // fetch শেষ হলে false
    }
  };

  const handleLike = (artifact) => {
    if (!user) {
      toast.error("Please login to like artifacts.");
      return;
    }

    const alreadyLiked = likedIds.includes(artifact._id);

    if (alreadyLiked) {
      // 👉 Dislike Logic
      fetch(
        `${API_BASE}/likedArtifacts/${artifact._id}?userEmail=${user.email}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Disliked.");
            setLikedIds((prev) => prev.filter((id) => id !== artifact._id));

            // Update like count
            fetch(`${API_BASE}/artifacts/${artifact._id}/unlike`, {
              method: "PATCH",
            });

            setAllArtifacts((prev) =>
              prev.map((item) =>
                item._id === artifact._id
                  ? {
                      ...item,
                      likeCount: Math.max((item.likeCount || 1) - 1, 0),
                    }
                  : item
              )
            );
          }
        });
    } else {
      // 👉 Like Logic
      const likeData = {
        artifactId: artifact._id,
        userEmail: user.email,
        artifactName: artifact.name,
        image: artifact.image,
        description: artifact.description,
        createdAt: artifact.createdAt,
        presentLocation: artifact.presentLocation,
        likeCount: artifact.likeCount || 0,
      };

      fetch(`${API_BASE}/likedArtifacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(likeData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Liked!");
            setLikedIds((prev) => [...prev, artifact._id]);

            fetch(`${API_BASE}/artifacts/${artifact._id}/like`, {
              method: "PATCH",
            });

            setAllArtifacts((prev) =>
              prev.map((item) =>
                item._id === artifact._id
                  ? { ...item, likeCount: (item.likeCount || 0) + 1 }
                  : item
              )
            );
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to like.");
        });
    }
  };

  return (
    <section className="py-16 bg-[#0b1120] min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          🏺 Explore Historical Artifacts
        </h2>

        {/* 🔍 Search */}
        <div className="mb-8 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search by artifact name..."
            className="px-4 py-2 rounded-md w-full max-w-md text-white bg-[#1e293b] border border-gray-500 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => fetchArtifacts(searchText)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            title="Search now"
          >
            <FaSearch /> Search
          </button>
        </div>

        {allArtifacts.length === 0 ? (
          <p className="text-center text-gray-300">No artifacts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <ClipLoader color="#3b82f6" loading={loading} size={50} />
              </div>
            ) : (
              allArtifacts.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#1e293b] text-white rounded-xl shadow-md relative border p-2 border-[#334155]"
                >
                  <div className="absolute top-3 right-3">
                    <button
                      className={`${
                        likedIds.includes(item._id)
                          ? "text-red-500 hover:text-gray-300"
                          : "text-gray-300 hover:text-red-400"
                      }`}
                      onClick={() => handleLike(item)}
                      title={
                        likedIds.includes(item._id)
                          ? "Click to Dislike"
                          : "Click to Like this artifact"
                      }
                    >
                      <FaHeart className="text-2xl cursor-pointer" />
                    </button>
                  </div>

                  <div className="h-48 md:h-50 lg:h-60 overflow-hidden rounded-lg mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="px-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-300 mt-1 mb-4">
                      {item.description?.slice(0, 80) ||
                        "No description available."}
                    </p>

                    <div className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                      <FaCalendarAlt className="text-gray-500" />
                      Created: {item.createdAt || "N/A"}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-2 mb-4">
                      <FaMapMarkerAlt className="text-gray-500" />
                      Location: {item.presentLocation || "N/A"}
                    </div>

                    <div className="flex justify-between items-center py-4">
                      <span className="text-red-400 flex items-center gap-1">
                        <FaHeart /> {item.likeCount || 0}
                      </span>
                      <Link to={`/artifact-details/${item._id}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md flex items-center gap-1 transition cursor-pointer">
                          <FaEye /> View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllArtifacts;
