import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // ✅ Make sure Axios is imported
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Connections from './Connections';
import Feed from './Feed';
import Request from './Request';
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());  // ✅ Removes user from Redux
      navigate("/login", { replace: true });  // ✅ Prevents history back issue
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" key={user ? "loggedIn" : "loggedOut"}>
      <div className="container-fluid">
        {/* Brand */}
        <Link to="/" className="navbar-brand" element={<Feed />}>DevTinder</Link>

        {/* Search Input */}
        <form className="d-flex me-auto">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>

        {/* Profile Dropdown */}
        {user ? (  // ✅ Proper check for user existence
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle d-flex align-items-center" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <p className="mb-0 me-2">Welcome, {user?.user?.firstName || "User"}</p>
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li>
                <Link to="/profile" element={<Profile />} className="dropdown-item"> Profile</Link>
              </li>
              <li><Link to="/connections" className="dropdown-item" element={<Connections/>}>Connections</Link></li>
              <li><a className="dropdown-item text-danger" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a></li>
              <li><Link to="/request" className="dropdown-item" element={<Request />}>Request</Link></li>
            </ul>
          </div>
        ) : null}  {/* ✅ Ensures profile dropdown disappears after logout */}
      </div>
    </nav>
  );
};

export default Navbar;
