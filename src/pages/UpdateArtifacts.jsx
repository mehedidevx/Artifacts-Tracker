import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateArtifacts = () => {
  const artifact = useLoaderData();
  const navigate = useNavigate();

  const handleUpdateArtifact = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedArtifact = {
      name: form.name.value,
      image: form.image.value,
      type: form.type.value,
      historicalContext: form.historicalContext.value,
      description: form.description.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
      adderName: form.adderName.value,
      adderEmail: form.adderEmail.value,
    };

    fetch(`http://localhost:3000/artifacts/${artifact._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArtifact),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Artifact updated successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/all-artifacts");
      });
  };

  return (
    <div className="min-h-screen bg-[#140847] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Update Artifact
        </h2>

        <form onSubmit={handleUpdateArtifact} className="space-y-5">
          {/* Artifact Name */}
          <div>
            <label className="block mb-1 font-medium">Artifact Name</label>
            <input
              type="text"
              name="name"
              defaultValue={artifact.name}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium">Artifact Image URL</label>
            <input
              type="url"
              name="image"
              defaultValue={artifact.image}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Artifact Type</label>
            <select
              name="type"
              defaultValue={artifact.type}
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
              name="historicalContext"
              defaultValue={artifact.historicalContext}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 font-medium">Short Description</label>
            <textarea
              name="description"
              defaultValue={artifact.description}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
            />
          </div>

          {/* Created At */}
          <div>
            <label className="block mb-1 font-medium">Created At</label>
            <input
              type="text"
              name="createdAt"
              defaultValue={artifact.createdAt}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Discovered At */}
          <div>
            <label className="block mb-1 font-medium">Discovered At</label>
            <input
              type="text"
              name="discoveredAt"
              defaultValue={artifact.discoveredAt}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Discovered By */}
          <div>
            <label className="block mb-1 font-medium">Discovered By</label>
            <input
              type="text"
              name="discoveredBy"
              defaultValue={artifact.discoveredBy}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Present Location */}
          <div>
            <label className="block mb-1 font-medium">Present Location</label>
            <input
              type="text"
              name="presentLocation"
              defaultValue={artifact.presentLocation}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Read-Only User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Adder Name</label>
              <input
                type="text"
                name="adderName"
                defaultValue={artifact.addedByName}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 border rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Adder Email</label>
              <input
                type="email"
                name="adderEmail"
                defaultValue={artifact.addedByEmail}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 border rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer"
            >
              Update Artifact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArtifacts;
