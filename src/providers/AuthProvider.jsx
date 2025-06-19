import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app, { githubProvider, provider } from "../firebase/firebase.config";
import toast from "react-hot-toast";
export const AuthContext = createContext();
import { updateProfile } from "firebase/auth";
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const createUser = (email, password, name, photoURL) => {
  setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
    
      return updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      }).then(() => {
        setUser({ ...result.user, displayName: name, photoURL: photoURL });
        return result;
      });
    });
};




const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        toast.success("Logout successful!");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const githubLogin = () => {
  setLoading(true);
  return signInWithPopup(auth, githubProvider);
};
  const forgotPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

const userProfile = (userUpdate) =>{
      updateProfile(auth.currentUser, userUpdate)
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    logIn,
    logOut,
    createUser,
    loading,
    setLoading,
    forgotPassword,
    googleLogin,
    githubLogin,
    userProfile,
    
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
