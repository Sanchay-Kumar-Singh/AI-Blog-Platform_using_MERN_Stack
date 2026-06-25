import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between relative shadow-sm">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-zinc-900"
        onClick={closeMenu}
      >
        ✦ AI Blog
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex  items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
        <Link
          to="/"
          className="px-4 py-2 rounded-full text-sm text-zinc-900 font-medium hover:text-zinc-800 transition"
        >
          Home
        </Link>

        <Link
          to="/blogs"
          className="px-4 py-2 rounded-full text-sm text-zinc-900  font-medium  hover:text-zinc-800 transition"
        >
          Blogs
        </Link>

        {user && (
          <>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-full text-sm text-zinc-5=900  font-medium  hover:text-zinc-800 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/create"
              className="px-4 py-2 rounded-full text-sm text-zinc-900  font-medium  hover:text-zinc-800 transition"
            >
              Write
            </Link>
          </>
        )}
      </div>

      {/* Right Side Buttons Desktop */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 bg-gradient-to-r from-zinc-950 to-zinc-500 text-white hover:opacity-90 text-sm font-medium pl-5 pr-2 py-2 rounded-full"
          >
            Logout
            <span className="size-7 rounded-full bg-white flex items-center justify-center">
              →
            </span>
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-zinc-700 hover:text-zinc-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2.5 bg-gradient-to-r from-zinc-950 to-zinc-500 text-white hover:opacity-90 text-sm font-medium pl-5 pr-2 py-2 rounded-full"
            >
              Sign Up
              <span className="size-7 rounded-full bg-white flex items-center justify-center text-black">
                →
              </span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 bg-transparent"
      >
        <span
          className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>

        <span
          className={`block w-6 h-0.5 bg-zinc-800 transition-opacity ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>

        <span
          className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-2 md:hidden z-50 shadow-lg">

          <Link
            to="/"
            onClick={closeMenu}
            className="px-4 py-2.5 rounded-lg text-zinc-700 hover:bg-zinc-50"
          >
            Home
          </Link>

          <Link
            to="/blogs"
            onClick={closeMenu}
            className="px-4 py-2.5 rounded-lg text-zinc-700 hover:bg-zinc-50"
          >
            Blogs
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="px-4 py-2.5 rounded-lg text-zinc-700 hover:bg-zinc-50"
              >
                Dashboard
              </Link>

              <Link
                to="/create"
                onClick={closeMenu}
                className="px-4 py-2.5 rounded-lg text-zinc-700 hover:bg-zinc-50"
              >
                Write
              </Link>

              <button
                onClick={handleLogout}
                className="mt-3 w-fit px-5 py-2.5 rounded-full bg-gradient-to-r from-zinc-950 to-zinc-500 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="px-4 py-2.5 rounded-lg text-zinc-700 hover:bg-zinc-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="mt-3 w-fit px-5 py-2.5 rounded-full bg-gradient-to-r from-zinc-950 to-zinc-500 text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'

// const Navbar = () => {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()
//   const [menuOpen, setMenuOpen] = useState(false)

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   return (
//     <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
//           ✦ AI Blog
//         </Link>

//         {/* Desktop links */}
//         <ul className="hidden md:flex items-center gap-2 list-none">
//           <li>
//             <Link to="/" className="px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 text-sm font-medium transition">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/blogs" className="px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 text-sm font-medium transition">
//               Blogs
//             </Link>
//           </li>
//           {user ? (
//             <>
//               <li>
//                 <Link to="/dashboard" className="px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 text-sm font-medium transition">
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/create" className="px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 text-sm font-medium transition">
//                   Write
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to="/login" className="px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 text-sm font-medium transition">
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
//                   Sign Up
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         {/* Mobile hamburger */}
//         <button
//           className="md:hidden text-2xl text-gray-700"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
//           <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">Home</Link>
//           <Link to="/blogs" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">Blogs</Link>
//           {user ? (
//             <>
//               <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">Dashboard</Link>
//               <Link to="/create" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">Write</Link>
//               <button onClick={handleLogout} className="text-left py-2 text-sm text-red-500 font-medium">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-gray-700">Login</Link>
//               <Link to="/register" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-indigo-600">Sign Up</Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar
