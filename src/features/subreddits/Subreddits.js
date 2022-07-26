import React, { useState, useEffect } from "react";
import "./Subreddits.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSubreddit,
  selectSubreddits,
  loadSubredditOptions,
  isLoadingSubreddits,
  errorLoadingSubreddits,
} from "./subredditsSlice";
import { resetPostsandComments } from "../subreddit/subredditSlice";

const Subreddits = () => {
  const subreddits = useSelector(selectSubreddits);
  const [currentSubreddit, setCurrentSubreddit] = useState("Home");
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSubreddits);
  const errorLoading = useSelector(errorLoadingSubreddits);

  useEffect(() => {
    dispatch(loadSubredditOptions());
  }, [dispatch]);

  const handleClick = (subreddit) => {
    if (subreddit.display_name !== currentSubreddit) {
      window.scrollTo(0, 0);
      dispatch(resetPostsandComments());
      dispatch(changeSubreddit(subreddit));
      setCurrentSubreddit(subreddit.display_name);
    }
  };

  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((subreddit, index) => {
          return (
            <li
              className={
                currentSubreddit === subreddit.display_name ? "active" : ""
              }
              key={index}
              onClick={() => handleClick(subreddit)}
            >
              <div className="icon">
                {subreddit.icon && <img alt={"icon"} src={subreddit.icon} />}
              </div>
              {subreddit.display_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Subreddits;
