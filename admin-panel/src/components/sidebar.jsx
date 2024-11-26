// Sidebar.jsx
import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaTachometerAlt, FaListAlt, FaBuilding, FaBox, FaEnvelope, FaSignInAlt, FaClosedCaptioning, FaCross, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

const toggleSidebar = () => {
  setIsOpen(!isOpen);
}

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", link: "/dashboard" },
    { icon: <FaListAlt />, label: "Main Category", link: "/maincategory" },
    { icon: <FaBox />, label: "Products", link: "/product" },
    { icon: <FaBuilding />, label: "Partner Company", link: "/partnercompany" },
    { icon: <FaEnvelope />, label: "Contact Us", link: "/contactus" },
    { icon: <FaSignInAlt />, label: "Sign Out", link: "#" },
  ];

  return (
   <div className={`h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black  relative overflow-hidden ${isOpen? "w-60":"w-[70px]"} transition-all  duration-500 ease-in-out shadow-lg`}>
    <div className="flex items-center justify-between p-6">
    <button
          className="text-xl focus:outline-none text-white z-10"
          onClick={toggleSidebar}
        >
            {isOpen ? (
    <FaChevronLeft className="transition-transform duration-500 transform hover:scale-110" />
  ) : (
    <FaBars className="transition-transform duration-500 transform hover:scale-110" />
  )}
        </button>
    <h1 className={`text-xl font-bold text-white transition-all duration-500 ease-in-out ${ isOpen? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 z-0"}`}>BalaKumar</h1>
    </div>
    <nav className="mt-10">
    {menuItems.map((item, index) => (
      <Link key={index} to={item.link} className="flex items-center rounded-md mx-2  gap-4 py-5 px-4 hover:bg-gray-700 hover:shadow-md transition-all duration-300">
        <div className={`text-xl text-white transition-transform duration-500 transform ${isOpen ? "scale-100": "scale-125"}`}>{item.icon}</div>
        <span className={`text-md text-white font-semibold transition-all duration-1000 ${ isOpen ? "opacity-100" : "opacity-0 hidden" }`}>{item.label}</span>
      </Link>
    ))

    }
    </nav>
   </div>
  );
};

export default Sidebar;
