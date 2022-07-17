import React, { useState, useEffect } from "react";
import "./Subreddits.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSubreddit,
  selectSubreddits,
  loadSubredditOptions,
} from "../../features/subreddit/subredditSlice";

const Subreddits = () => {
  const subreddits = useSelector(selectSubreddits);
  const [currentSubreddit, setCurrentSubreddit] = useState("Home");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSubredditOptions());
  }, [dispatch]);

  const handleClick = (subreddit) => {
    if (subreddit !== currentSubreddit) {
      window.scrollTo(0,0);
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
            <li className={currentSubreddit=== subreddit?'active':''} key={index} onClick={() => handleClick(subreddit)}>
              <div className="icon">{subreddit.icon && <img alt={"icon"} src={subreddit.icon} />}</div>
              {subreddit.display_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Subreddits;
