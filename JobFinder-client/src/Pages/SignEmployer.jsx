import React, { useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup,updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaFacebookF,
    FaGoogle,
    FaInstagram,
    FaLinkedin,
  } from "react-icons/fa6";



const SignEmployer = () => {
    const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/login";

  const SignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true); // Set loading to true when starting authentications
      await  createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with role
      await updateProfile(auth.currentUser, {
        displayName: "employer",
      });
      alert("Sign Up successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Sign Up error:", error);
      setErrorMessage("Please provide valid email & password!");
    }
    finally {
      setLoading(false); // Set loading to false when authentication is complete (success or failure)
    }
  };

  const handleRegister = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // Force account selection
  
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      // Handle the error or display a message to the user
    }
  };
    return (
        <div className="h-screen mx-auto container flex items-center justify-center">
          <div className="w-full max-w-xs mx-auto">
            <form onSubmit={SignUp}
              className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
            >
              <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Work Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Company Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="companyName"
                  type="text"
                  placeholder="Your Company Name"
                />
              </div>
    
              {/* show errors */}
              {errorMessage ? (
                <p className="text-red-500 text-xs italic">
                  Please check your information.
                </p>
              ) : (
                ""
              )}
    
              <div className="flex items-center justify-between">
                <input
                  className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value={loading ? "Signing up..." : "Sign up"}
                />
              </div>
            </form>
    
           
          </div>
        </div>
      );
}

export default SignEmployer
