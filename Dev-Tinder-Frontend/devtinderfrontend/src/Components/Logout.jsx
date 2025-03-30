// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { removeUser } from "../utils/userSlice";

// const Logout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user); // Debug current user state

//   const handleLogout = () => {
//     console.log("Before Logout:", user); // Debug before logout
//     dispatch(removeUser()); // Clear user from Redux store

//     setTimeout(() => {
//       console.log("After Logout:", user); // Debug after logout
//       navigate("/login", { replace: true }); // Redirect to login page
//     }, 100); // Small delay ensures Redux state update before navigation
//   };

//   return (
//     <button className="dropdown-item text-danger" onClick={handleLogout}>
//       Logout
//     </button>
//   );
// };

// export default Logout;
