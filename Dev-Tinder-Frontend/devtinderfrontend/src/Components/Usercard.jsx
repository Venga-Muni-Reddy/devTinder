import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status,userId)=>{ 
    try{
      const res = await axios.post(import.meta.env.VITE_BASE_URL+"/request/send/"+status+"/"+userId,
        {},
        {withCredentials:true});
        dispatch(removeUserFromFeed(userId))
    }catch(err){

    }
  }

  return (
    <div className="card shadow-sm mx-auto" style={{ width: "22rem", backgroundColor: "yellow" }}>
      <img
        src={user?.photoUrl || "https://thumbs.dreamstime.com/b/eagle-logo-design-template-incorporates-strong-stylized-depiction-eagle-s-head-vector-illustration-eagle-logo-design-321396051.jpg"} // Handle missing image
        className="card-img-top"
        alt="User"
      />
      <div className="card-body text-center">
        <h5 className="card-title">{user?.firstName +" "+user?.lastName || "No Name"}</h5>
        <p className="card-text">
          {"Gender :"+user?.gender || "No description available."}
        </p>
        <p className="card-text">
          {"Age :"+user?.age || "No description available."}
        </p>
        <button className="btn btn-danger" onClick={()=>{handleSendRequest("ignored",user?._id)}}>Ignored</button>
        <button className="btn btn-primary" onClick={()=>{handleSendRequest("interested",user?._id)}}>Interested</button>
      </div>
    </div>
  );
};

export default UserCard;
