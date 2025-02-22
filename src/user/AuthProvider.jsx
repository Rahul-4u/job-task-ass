import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../components/AuthContext";

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const googleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      // ✅ Send user data to backend
      await fetch("http://localhost:5000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });

      console.log("User logged in:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        await fetch("http://localhost:5000/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: loggedInUser.uid,
            name: loggedInUser.displayName,
            email: loggedInUser.email,
            photoURL: loggedInUser.photoURL,
          }),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        selectedCategory,
        setSelectedCategory,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
