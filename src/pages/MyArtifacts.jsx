import { Link, useLoaderData } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyArtifacts = () => {
  const initialArtifacts = useLoaderData();


  const { user } = useContext(AuthContext);

const [artifacts, setArtifacts] = useState(
  initialArtifacts.filter(
    (room) =>
      room?.addedByEmail?.trim().toLowerCase() ===
      user?.email?.trim().toLowerCase()
  )
);
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/artifacts/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Delete Successful");
              Swal.fire({
                title: "Deleted!",
                text: "Your itemmate Finder Post has been deleted.",
                icon: "success",
              });
              const remainingArtifacts = artifacts.filter(
                (rom) => rom._id !== _id
              );
              setArtifacts(remainingArtifacts);
            }
          });
      }
    });
  };

  return (
    <div className="bg-[#0f1d38]">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-150 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            My Artifacts
          </h1>
          <Link to="/add-artifact">
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90 transition-all text-sm cursor-pointer sm:text-base">
              ➕ Add New Artifacts
            </button>
          </Link>
        </div>

        {artifacts.length === 0 ? (
          <div className="bg-[#1c1f3a] rounded-xl shadow-lg p-6 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">
              You haven't created any Artifacts yet.
            </h2>
            <p className="text-purple-200 mb-6 text-sm sm:text-base">
              Start by creating your first Artifacts now!
            </p>
            <Link to="/add-artifact">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90 transition-all cursor-pointer text-sm sm:text-base">
                ➕ Create Your First Artifacts
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((item) => (
              <div
                key={item._id}
                className="bg-[#1c1f3a] rounded-xl overflow-hidden shadow-lg border border-purple-700"
              >
                <div>
                  <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                </div>
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-bold text-purple-300">
                    {item.name}
                  </h2>
                  <p className="text-sm text-purple-200">{item.description}</p>
                  <p className="text-sm text-purple-300">📍 {item.location}</p>
                  <p className="text-sm text-purple-300">
                    🗓️ Created: {item.createdAt || "N/A"}
                  </p>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <p className="text-white flex items-center gap-1">
                      ❤️ {item.like || 0}
                    </p>
                    <p className="text-green-400">Available</p>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-4">
                    <Link
                      to={`/artifact-details/${item._id}`}
                      className="flex-1 py-1 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center text-sm"
                    >
                      <FaEye className="inline mr-1" /> View
                    </Link>
                    <Link
                      to={`/updateArtifacts/${item._id}`}
                      className="flex-1 py-1 px-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-center text-sm"
                    >
                      <FaEdit className="inline mr-1" /> Update
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 py-1 px-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-center text-sm"
                    >
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArtifacts;
