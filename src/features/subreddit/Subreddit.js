import React, { useEffect } from "react";
import "./Subreddit.css";
import Post from "../../Components/post/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPostsForSubreddit,
  selectPosts,
  isLoadingPosts,
  errorLoadingPosts,
} from "./subredditSlice";
import { selectSubreddit } from "../subreddits/subredditsSlice";

const Subreddit = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const currentSubreddit = useSelector(selectSubreddit);
  const isLoading = useSelector(isLoadingPosts);
  const errorLoading = useSelector(errorLoadingPosts);

  useEffect(() => {
    dispatch(loadPostsForSubreddit(currentSubreddit));
  }, [dispatch, currentSubreddit]);

  if (isLoading) {
    return (
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else if (errorLoading) {
    return <h1>Error</h1>;
  }
  else{
    return (
      <div className="subreddit">
      {posts.map((post, index) => {
        return <Post key={index} {...post} />;
      })}
    </div>
  );
}
};

export default Subreddit;
