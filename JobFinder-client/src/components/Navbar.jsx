/* eslint-disable react/no-unknown-property */
import React, {  useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [authuser,setAuthUser]=useState(null);
    useEffect(()=>{
      const listen = onAuthStateChanged(auth,(user)=>{
          if(user){
            setAuthUser(user)
          }else{
            setAuthUser(null)
          }
      });
      return ()=>{
        listen();
      }
    },[]);


  const isJobSeeker = authuser && (authuser.displayName === "seeker"|| authuser.providerData[0]?.providerId === "google.com");
  const isEmployer = authuser && authuser.displayName === "employer";

  
  const handleLogout = () => {
    signOut(auth).then(()=>{
      console.log(`Sign out successful`)
    }).catch(error=>console.log(error))
  };

  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/home", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    
    { path: "/post-job", title: "Post A Job" },
    { path: "/application", title: "Applications" },
   
  ];
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/home" className="flex items-center gap-2 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobsHub</span>
        </a>

          {/* nav items */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              {/* Conditional rendering based on user role */}
              {isJobSeeker && (title === "Start a search" || title === "Applications") ? (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              ) : isEmployer && title !== "Applications"? (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              ) : null}
            </li>
          ))}
        </ul>

        {/* sign up signout btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {authuser ? (
            <>
              <div className="flex gap-4 items-center mt-4">
                <div className="flex -space-x-2 overflow-hidden ">
                  {
                    authuser?.photoURL ? <> <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={authuser?.photoURL}
                    alt=""
                  /></> : <> <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  /></>
                  }
                 
                </div>
                <button onClick={handleLogout} className="py-2 px-5 border rounded hover:bg-blue hover:text-white">Log out</button>
              </div>
              <div>
                {authuser ? (<p >{`Signed in as ${authuser.email}`}</p>):<p>out</p>}
              </div>
            </>
          ) : (
            <>
              {" "}
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link
                to="/SignUp"
                className="bg-blue py-2 px-5 text-white rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
           
        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (
              <>
                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
              </>
            )}
          </button>
        </div>
      </nav>

     {/* mobile menu items */}
<div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
    <ul>
        {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white py-1">
                {/* Conditional rendering based on user role */}
                {isJobSeeker && (title === "Start a search" || title === "Applications") ? (
                    <NavLink
                        onClick={handleMenuToggler}
                        to={path}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        {title}
                    </NavLink>
                ) : isEmployer && title !== "Applications" ? (
                    <NavLink
                        onClick={handleMenuToggler}
                        to={path}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        {title}
                    </NavLink>
                ) : null}
            </li>
        ))}
        {authuser && (
            <li className="text-white py-1">
                <button onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                }}>
                    Log out
                </button>
            </li>
        )}
    </ul>
</div>

      
    </header>
  );
};

export default Navbar;

