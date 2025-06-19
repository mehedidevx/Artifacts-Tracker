import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaBed,
  FaEye,
  FaCalendarAlt,
  FaHeart,
} from "react-icons/fa";

const FeatureArtifacts = () => {
  const artifacts = useLoaderData();

  const visibleArtifacts = artifacts.slice(0, 6);

  return (
    <section className="py-16 bg-[#0b1120] min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-3 text-center text-white">
          Featured Artifacts
        </h2>
        <p className="text-white text-center mb-8">
          Discover some of the most liked historical artifacts in our
          collection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleArtifacts.map((item) => (
            <div
              key={item._id}
              className="bg-[#1e293b] text-white p-4 rounded-xl shadow-md relative border border-[#334155]"
            >
              {/* Favorite Icon */}
              <div className="absolute top-3 right-3"></div>

              {/* Image */}
              <div className="h-48 overflow-hidden rounded-lg mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Title*/}
              <h3 className="text-lg font-semibold">{item.name}</h3>

              {/* Description */}
              <p className="text-sm text-gray-300 mt-1 mb-4">
                {item.description?.slice(0, 80) || "No description available."}
              </p>

              {/* Metadata */}
              <div className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <FaCalendarAlt className="text-gray-500" />
                Created: {item.createdAt || "N/A"}
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-gray-500" />
                Location: {item.presentLocation || "N/A"}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <span className="text-red-400 flex items-center gap-1">
                  <FaHeart /> {item.likeCount || 428}
                </span>
                <Link to={`/artifact-details/${item._id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md flex items-center gap-1 transition">
                    <FaEye /> View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {artifacts.length > 6 && (
          <div className="text-center mt-10">
            <Link to="/all-artifacts">
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition cursor-pointer">
                See More
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureArtifacts;
