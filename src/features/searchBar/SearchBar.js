import React from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
  clearSearchTerm,
} from "./searchBarSlice";
import {
  loadPostsForSubreddit,
  searchForPost,
  resetPostsandComments,
} from "../subreddit/subredditSlice";
import { selectSubreddit } from "../subreddits/subredditsSlice";
import { GrFormClose } from "react-icons/gr";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const subreddit = useSelector(selectSubreddit);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(searchForPost(searchTerm));
    }
  };

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const clearSearchandLoadPosts = () => {
    dispatch(clearSearchTerm());
    dispatch(resetPostsandComments());
    dispatch(loadPostsForSubreddit(subreddit));
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        {searchTerm.length > 0 && (
          <button onClick={clearSearchandLoadPosts}>
            <GrFormClose />
          </button>
        )}
        <input
          type={"text"}
          placeholder="search for post"
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        ></input>
        <button type="submit">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
