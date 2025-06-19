import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const artifactData = {
      name: data.artifactName,
      image: data.image,
      type: data.type,
      historicalContext: data.historicalContext,
      description: data.description,
      createdAt: data.createdAt,
      discoveredAt: data.discoveredAt,
      discoveredBy: data.discoveredBy,
      presentLocation: data.presentLocation,
      addedByName: user?.displayName || "Unknown",
      addedByEmail: user?.email || "Unknown",
      likeCount: 0,
    };

    fetch("http://localhost:3000/artifacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(artifactData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Artifact added successfully!");
          reset();
          navigate("/all-artifacts");
        }
      })
      .catch(() => toast.error("Failed to add artifact"));
  };

  return (
    <div className="min-h-screen bg-[#140847] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Add New Artifact
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Artifact Name */}
          <div>
            <label className="block mb-1 font-medium">Artifact Name</label>
            <input
              type="text"
              {...register("artifactName", { required: true })}
              placeholder="Rosetta Stone"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Artifact Image */}
          <div>
            <label className="block mb-1 font-medium">Artifact Image URL</label>
            <input
              type="url"
              {...register("image", { required: true })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Artifact Type */}
          <div>
            <label className="block mb-1 font-medium">Artifact Type</label>
            <select
              {...register("type", { required: true })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Tools">Tools</option>
              <option value="Weapons">Weapons</option>
              <option value="Documents">Documents</option>
              <option value="Writings">Writings</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Historical Context */}
          <div>
            <label className="block mb-1 font-medium">Historical Context</label>
            <input
              type="text"
              {...register("historicalContext", { required: true })}
              placeholder="Used during the Egyptian Ptolemaic period"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 font-medium">Short Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="A granodiorite stele inscribed with a decree..."
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
            ></textarea>
          </div>

          {/* Created At */}
          <div>
            <label className="block mb-1 font-medium">Created At</label>
            <input
              type="text"
              {...register("createdAt", { required: true })}
              placeholder="100 BC"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Discovered At */}
          <div>
            <label className="block mb-1 font-medium">Discovered At</label>
            <input
              type="text"
              {...register("discoveredAt", { required: true })}
              placeholder="1799"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Discovered By */}
          <div>
            <label className="block mb-1 font-medium">Discovered By</label>
            <input
              type="text"
              {...register("discoveredBy", { required: true })}
              placeholder="Pierre-François Bouchard"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Present Location */}
          <div>
            <label className="block mb-1 font-medium">Present Location</label>
            <input
              type="text"
              {...register("presentLocation", { required: true })}
              placeholder="British Museum, London"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* User info (Read-only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full cursor-not-allowed px-4 py-2 bg-gray-100 border rounded-lg text-gray-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Your Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full cursor-not-allowed px-4 py-2 bg-gray-100 border rounded-lg text-gray-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Add Artifact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtifact;
