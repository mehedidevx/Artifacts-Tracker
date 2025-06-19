import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';
import { updateProfile } from 'firebase/auth';

const MyProfile = () => {
  const { user, logOut, setUser } = useContext(AuthContext);
  console.log(user)
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };


const handleSaveChanges = async () => {
  try {
    await updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });


    setUser({
      ...user,
      displayName: name,
      photoURL: photoURL,
    });

    console.log("Profile updated successfully");
    setEditMode(false);
  } catch (error) {
    console.error("Profile update failed:", error);
  }
};

  const handleCancel = () => {
    setEditMode(false);
    setName(user?.displayName || '');
    setPhotoURL(user?.photoURL || '');
  };

  return (
    <div className="py-10  flex justify-center items-center p-4">
      <Helmet>
        <title>Home || Profile </title>
        <meta
          name="description"
          content="Track and manage your bills efficiently with Job Track."
        />
      </Helmet>
      <div className="max-w-md w-full bg-[#7992d8] p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">My Profile</h2>

        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400">
              <img src={photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Profile" />
            </div>
          </div>
        </div>

        {editMode ? (
          <div className="space-y-4 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="w-full border p-2 rounded"
            />
          </div>
        ) : (
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold">{user?.displayName || "User Name"}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        )}

        {!editMode && (
          <div className="bg-blue-100 p-4 rounded-md mb-4">
            <h4 className="text-lg font-semibold text-gray-700">Additional Information</h4>
            <ul className="text-gray-600 mt-2">
              <li>Location: {user?.location || "Not Provided"}</li>
              <li>Joined: {user?.createdAt || "Not Available"}</li>
            </ul>
          </div>
        )}

        <div className="flex py-8 justify-center gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogOut}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
