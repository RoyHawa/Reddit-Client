import React, { useState } from "react";
import "./Subreddits.css";
import { useDispatch } from "react-redux";
import { changeSubreddit } from "../../features/subreddit/subredditSlice";

import { subreddits } from "../../data/subreddits";
// import Subreddit from "../../features/subreddit/Subreddit.js";

const Subreddits = () => {
  const [currentSubreddit, setCurrentSubreddit] = useState("Home");
  const dispatch = useDispatch();

  const handleClick = (subreddit) => {
    if (subreddit !== currentSubreddit) {
      dispatch(changeSubreddit(subreddit));
      setCurrentSubreddit(subreddit);
    }
  };

  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((subreddit, index) => {
          return (
            <li key={index} onClick={() => handleClick(subreddit)}>
              {subreddit}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Subreddits;
