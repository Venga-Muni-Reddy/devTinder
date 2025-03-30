import React, { useState } from 'react';
import UserCard from './USerCard';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    // State for editable fields (excluding emailId & password)
    const [firstName, setFirstname] = useState(user?.user?.firstName || "");
    const [lastName, setLastname] = useState(user?.user?.lastName || "");
    const [age, setAge] = useState(user?.user?.age || "");
    const [gender, setGender] = useState(user?.user?.gender || ""); 
    const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl || ""); 
    const [about, setAbout] = useState(user?.user?.about || ""); 
    const [skills, setSkills] = useState(user?.user?.skills?.join(", ") || ""); // Convert array to string

    // Function to save profile updates
    const saveProfile = async () => {
      try {
          const requestData = {
              firstName, 
              lastName, 
              age, 
              gender, 
              photoUrl, 
              about, 
              skills: skills ? skills.split(",").map(skill => skill.trim()) : []
          };
  
          console.log("Sending data:", JSON.stringify(requestData, null, 2)); // ✅ Debug log
  
          const res = await axios.post(import.meta.env.VITE_BASE_URL + "/profile/edit",
              requestData, 
              { withCredentials: true, headers: { "Content-Type": "application/json" } }
          );
  
          console.log("Profile updated:", res.data);
          dispatch(addUser(res.data.data));
  
      } catch (error) {
          console.error("Error updating profile:", error.response ? error.response.data : error.message);
      }
  };
  
  

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
            <div className="card border-primary mb-3" style={{ width: "28rem" }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Edit Profile</h2>
                    <fieldset className="border p-3 rounded">
                        <legend className="w-auto px-2 text-primary fw-bold">First Name :</legend>
                        <input type="text" className="form-control mb-2" value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="Type here" />

                        <legend className="w-auto px-2 text-primary fw-bold">Last Name :</legend>
                        <input type="text" className="form-control mb-2" value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Type here" />

                        <legend className="w-auto px-2 text-primary fw-bold">Age :</legend>
                        <input type="number" className="form-control mb-2" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Type here" />

                        <legend className="w-auto px-2 text-primary fw-bold">Gender :</legend>
                        <select className="form-control mb-2" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <legend className="w-auto px-2 text-primary fw-bold">Photo URL :</legend>
                        <input type="text" className="form-control mb-2" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Enter image URL" />

                        <legend className="w-auto px-2 text-primary fw-bold">About Me :</legend>
                        <textarea className="form-control mb-2" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Tell something about yourself"></textarea>

                        <legend className="w-auto px-2 text-primary fw-bold">Skills (comma-separated) :</legend>
                        <input type="text" className="form-control mb-2" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="E.g., React, Node.js, MongoDB" />
                    </fieldset>

                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, photoUrl, about, skills: skills.split(",") }} />
        </div>
    );
};

export default EditProfile;
