import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function Login() {
  const { googleLogin } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      console.log("Google Sign-in Successful");
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
