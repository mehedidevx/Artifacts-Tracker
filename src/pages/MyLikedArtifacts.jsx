import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { IoIosHeartDislike } from "react-icons/io";

const MyLikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/likedArtifacts?userEmail=${user.email}`)
        .then((res) => setLikedArtifacts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDislike = (artifactId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove it from your liked list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://localhost:3000/likedArtifacts/${artifactId}?userEmail=${user.email}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Removed from liked list.");
              Swal.fire("Removed!", "The artifact was removed.", "success");

              const remaining = likedArtifacts.filter(
                (item) => item.artifactId !== artifactId
              );
              setLikedArtifacts(remaining);
            } else {
              toast.error("Not found or already removed.");
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to remove.");
          });
      }
    });
  };
  return (
    <section className="py-16 bg-[#0f172a] min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          ❤️ My Liked Artifacts
        </h2>

        {likedArtifacts.length === 0 ? (
          <p className="text-center text-gray-300">
            You haven't liked any artifacts yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {likedArtifacts.map((item) => (
              <div
                key={item._id}
                className="bg-[#1e293b] text-white rounded-xl shadow-md border p-2 border-[#334155] relative"
              >
               
                <div className="absolute top-3 right-3">
                  <button onClick={() => handleDislike(item.artifactId)}>
                    <IoIosHeartDislike className="text-2xl text-red-700 cursor-pointer" />
                  </button>
                </div>

                {/* Image */}
                <div className="h-48 overflow-hidden rounded-lg mb-3">
                  <img
                    src={item.image}
                    alt={item.artifactName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold px-2">{item.name}</h3>

                {/* Description */}
                <p className="text-sm text-gray-300 px-2 mt-1 mb-4">
                  {item.description?.slice(0, 80) ||
                    "No description available."}
                </p>

                {/* Metadata */}
                <div className="text-sm text-gray-400 flex items-center gap-2 mb-1 px-2">
                  <FaCalendarAlt className="text-gray-500" />
                  Created: {item.createdAt || "N/A"}
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2 px-2 mb-4">
                  <FaMapMarkerAlt className="text-gray-500" />
                  Location: {item.presentLocation || "N/A"}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-2 py-4">
                  <span className="text-red-400 flex items-center gap-1">
                    <FaHeart /> {item.likeCount ?? 0}
                  </span>
                  <Link to={`/artifact-details/${item.artifactId}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md flex items-center gap-1 transition cursor-pointer">
                      <FaEye /> View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyLikedArtifacts;
