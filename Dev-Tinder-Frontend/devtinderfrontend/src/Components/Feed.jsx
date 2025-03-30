import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./Usercard.jsx";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}` + "/feed",{withCredentials:true});

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, [])

  return (
    <div>
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p>No new users</p>
      )}
    </div>
  );
};

export default Feed;
