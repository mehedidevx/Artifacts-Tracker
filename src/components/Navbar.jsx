import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiSearch,
  FiPlusCircle,
  FiLogIn,
  FiLogOut,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,

} from "react-icons/fi";
import { FcAbout } from "react-icons/fc";
import { LuContact } from "react-icons/lu";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md font-medium ${
      isActive
        ? "bg-blue-600 "
        : "hover:bg-blue-600"
    }`;

  return (
    <nav className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-md py-2">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 bg-clip-text text-transparent">
          ArtifactTracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2 items-center">
          <NavLink to="/" className={navLinkClass}>
            <FiHome className="inline" /> Home
          </NavLink>
          <NavLink to="/all-artifacts" className={navLinkClass}>
            <FiSearch className="inline" /> All Artifacts
          </NavLink>
          
          {user && (
            <NavLink to="/add-artifact" className={navLinkClass}>
              <FiPlusCircle className="inline" /> Add Artifact
            </NavLink>
          )}
          <NavLink to="/about" className={navLinkClass}>
           <FcAbout className="inline" /> About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            <LuContact className="inline"/> Contact
          </NavLink>
        </div>

        {/* User / Login */}
        <div className="relative hidden md:block">
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-blue-400"
            >
              <FiLogIn /> Login
            </Link>
          ) : (
            <div className="relative">
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-400 cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#302b63] rounded shadow-lg z-10 p-3 space-y-2">
                  <p className="text-sm text-white font-semibold text-center">
                    {user?.displayName || "User"}
                  </p>
                  <hr className="border-white/20" />
                  <button
                    onClick={() => {
                      navigate("/my-artifacts");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 hover:text-purple-400 w-full"
                  >
                    <FiUser /> My Artifacts
                  </button>
                  <button
                    onClick={() => {
                      navigate("/like-artifacts");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 hover:text-purple-400 w-full"
                  >
                    <FiHeart /> Liked Artifacts
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-500 w-full"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1f1b3a] px-4 pb-4 text-white space-y-3">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>
            <FiHome className="inline" /> Home
          </NavLink>
          <NavLink to="/all-artifacts" onClick={() => setMenuOpen(false)} className={navLinkClass}>
            <FiSearch className="inline" /> All Artifacts
          </NavLink>
          {user && (
            <NavLink to="/add-artifact" onClick={() => setMenuOpen(false)} className={navLinkClass}>
              <FiPlusCircle className="inline" /> Add Artifact
            </NavLink>
          )}
          {!user ? (
            <NavLink to="/login" onClick={() => setMenuOpen(false)} className={navLinkClass}>
              <FiLogIn className="inline" /> Login
            </NavLink>
          ) : (
            <>
              <div className="border-t border-white/10 pt-2">
                <p className="text-sm font-semibold">{user?.displayName}</p>
                <button
                  onClick={() => {
                    navigate("/my-artifacts");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-purple-400"
                >
                  <FiUser className="inline" /> My Artifacts
                </button>
                <button
                  onClick={() => {
                    navigate("/like-artifacts");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-purple-400"
                >
                  <FiHeart className="inline" /> Liked Artifacts
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-400 hover:text-red-500"
                >
                  <FiLogOut className="inline" /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
