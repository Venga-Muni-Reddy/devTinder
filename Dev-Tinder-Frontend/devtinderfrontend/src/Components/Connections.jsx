import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addConnection } from "../utils/connectionSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const loggedInUserId = useSelector((store) => store.user?._id); // Assuming user ID is stored in Redux

    const fetchedConnections = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BASE_URL + "/user/connections", { withCredentials: true });

            // Filter out invalid connections
            const validConnections = res.data.data.filter(conn => conn && conn._id);

            dispatch(addConnection(validConnections));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchedConnections();
    }, []);

    if (!connections) return null; 
    if (connections.length === 0) return <h1 className="text-center mt-5">No Connections found</h1>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Connections Page</h1>
            <div className="row">
                {connections.map((connection, index) => {
                    const user = connection?._id 
                        ? connection 
                        : (connection.fromUserId?._id === loggedInUserId ? connection.toUserId : connection.fromUserId);

                    return (
                        <div key={index} className="col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm p-3">
                                <div className="d-flex align-items-center">
                                    <img 
                                        src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" 
                                        alt="logo" 
                                        className="rounded-circle me-3" 
                                    />
                                    <div>
                                        <h5 className="mb-1">
                                            {user?.firstName || "Unknown"} {user?.lastName || ""}
                                        </h5>
                                        <p className="mb-1 text-muted">Age: {user?.age || "Unknown"}</p>
                                        <p className="mb-0 text-muted">Gender: {user?.gender || "Unknown"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;
