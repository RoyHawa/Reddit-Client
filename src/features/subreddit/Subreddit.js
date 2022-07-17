import React, { useEffect } from "react";
import "./Subreddit.css";
import Post from "../../Components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { loadPostsForSubreddit, selectPosts } from "./subredditSlice";

const Subreddit = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(loadPostsForSubreddit());
  }, [dispatch]);

  return (
    <div className="subreddit">
      {posts.map((post, index) => {
        return <Post key={index} {...post} />;
      })}
    </div>
  );
};

export default Subreddit;
