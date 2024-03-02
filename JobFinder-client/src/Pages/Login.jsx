import React, { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import Footer from "../components/Footer";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/home";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Please provide a valid email and password!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
  
    try {
      const result = await signInWithPopup(auth, provider);
  
      // Check if the user is newly created (first time signing in)
      if (result.additionalUserInfo.isNewUser) {
        // Update user profile with role as "seeker"
        await updateProfile(auth.currentUser, {
          displayName: "seeker",
        });
      }
  
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      // Handle the error or display a message to the user
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen  mt-20">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xs mx-auto">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
          >
            <h3 className="text-xl font-semibold mb-4">Please Login!</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="name@email.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              {errorMessage ? (
                <p className="text-red-500 text-xs italic">
                  {errorMessage}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-between">
              <input
                className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value={loading ? "Signing in..." : "Sign in"}
              />
              <Link to="/signup"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Sign up here
              </Link>
            </div>
          </form>
          <div className="mt-8 text-center w-full mx-auto">
            <p className="mb-4">Sign In As A JobSeeker!</p>
            <div className="flex items-center justify-center gap-4 w-full mx-auto">
              <button
                className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2 mb-3"
                type="button"
                onClick={handleRegister}
              >
                <FaGoogle />
              </button>
              <button
              className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2 mb-3"
              type="button"
            >
              <FaFacebookF />
            </button>
            <button
              className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2 mb-3"
              type="button"
            >
              <FaLinkedin />
            </button>
            <button
              className="border-2 text-blue hover:text-white hover:bg-blue font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center gap-2 mb-3"
              type="button"
            >
              <FaInstagram />
            </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
      <Footer />
      </div>
      
    </div>
  );
};

export default Login;
