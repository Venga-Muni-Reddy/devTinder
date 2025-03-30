import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [isLogin,setIsLogin] = useState(true)

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { emailId, password },
        { withCredentials:true },
      );
      console.log(response)
      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`, 
        { firstName, lastName, emailId, password }, 
        { withCredentials: true }
      );
  
      if (res.status === 201 || res.status === 200) {
        setIsLogin(true); // Ensure UI updates before navigation
        navigate("/login");
      } else {
        setError("Signup failed, please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Signup Error:", err);
    }
  };
  
  

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "69vh" }}>
      <div className="card border-primary mb-3" style={{ width: "24rem" }}>
        <div className="card-body">
          <h2 className="card-title text-center">{isLogin?"Login":"Signup"}</h2>
          <div>
            <fieldset className="border p-3 rounded">
              {!isLogin && <>              
              <legend className="w-auto px-2 text-primary fw-bold">First Name</legend>
              <input type="text" className="form-control mb-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" />
              <legend className="w-auto px-2 text-primary fw-bold">Last Name</legend>
              <input type="text" className="form-control mb-2" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Type here" />
              </>}
              <legend className="w-auto px-2 text-primary fw-bold">Email Id</legend>
              <input type="text" className="form-control mb-2" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Type here" />
              <legend className="w-auto px-2 text-primary fw-bold">Password</legend>
              <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type here" />
            </fieldset>
          </div>
          <p className="text-danger">{error}</p>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={isLogin?handleLogin:handleSignup}>{isLogin?"Login":"Signup"}</button>
          </div>

          <p className="cursor-pointer" onClick={()=>setIsLogin((value)=>!value)}>{isLogin?"New user signup here":"Existed user ? login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
