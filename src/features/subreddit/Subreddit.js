import React, { useEffect } from "react";
import "./Subreddit.css";
import Post from "../../Components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPostsForSubreddit,
  selectPosts,
  selectSubreddit,
} from "./subredditSlice";

const Subreddit = () => {
  const posts=useSelector(selectPosts);
  const dispatch = useDispatch();
  const currentSubreddit = useSelector(selectSubreddit);

  useEffect(() => {
    dispatch(loadPostsForSubreddit(currentSubreddit));
  }, [dispatch, currentSubreddit]);
  
  return (
    <div className="subreddit">
      {posts.map((post, index) => {
        return <Post key={index} {...post} />;
      })}
    </div>
  );
};

export default Subreddit;
