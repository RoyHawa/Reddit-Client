import React from "react";
import "./App.css";
import SearchTerm from "../features/searchTerm/SearchTerm";
import Subreddit from "../features/subreddit/Subreddit";
import Subreddits from "../features/subreddits/Subreddits";

function App() {
  return (
    <div className="app">
      <SearchTerm />

      <div className="content">
        <Subreddits />
        <Subreddit />
      </div>
    </div>
  );
}

export default App;
