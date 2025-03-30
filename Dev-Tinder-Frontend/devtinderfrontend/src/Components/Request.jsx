import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
    const request = useSelector((store) => store.request);
    const dispatch = useDispatch();

    const reviewRequests = async (status,_id) => {
        try{
            const res = await axios.post(
                `${BASE_URL}/request/review/${status}/${_id}`, 
                {}, // No request body needed
                { withCredentials: true } // Pass as Axios config
            );
            
            dispatch(removeRequest(_id))
        }catch(error){
            console.error(error.message);
        }

    }

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
                dispatch(addRequest(res.data.data));
            } catch (error) {
                console.error("Error fetching requests:", error.message);
            }
        };
        fetchRequests();
    }, [dispatch]); // Added dispatch in dependencies

    if (!request || request.length === 0) return <h1>No Requests found</h1>;



    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Connections Page</h1>
            <div className="row">
                {request.map((req, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                        <div className="card shadow-sm p-3">
                            <div className="d-flex align-items-center">
                                {/* Left Side - Logo */}
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                                    alt="logo"
                                    className="rounded-circle me-3"
                                    width="50"
                                    height="50"
                                />

                                {/* Right Side - User Info */}
                                <div>
                                    <h5 className="mb-1">
                                        {req?.fromUserId?.firstName || "Unknown"} {req?.fromUserId?.lastName || ""}
                                    </h5>
                                    <p className="mb-1 text-muted">Age: {req?.fromUserId?.age || "Unknown"}</p>
                                    <p className="mb-0 text-muted">Gender: {req?.fromUserId?.gender || "Unknown"}</p>
                                </div>
                                <div>
                                    <button className="btn btn-primary" onClick={()=>reviewRequests("ignored",req._id)}>Reject</button>
                                    <button className="btn btn-secondary" onClick={()=>reviewRequests("accepted",req._id)}>Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Request;
