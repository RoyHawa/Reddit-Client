import React, { useState } from "react";
import './SearchBar.css';
import {FiSearch} from 'react-icons/fi';
import { useDispatch,useSelector } from "react-redux";
import { selectSearchTerm,setSearchTerm,clearSearchTerm } from "./searchBarSlice";
import { searchForPost } from "../subreddit/subredditSlice";
import {GrFormClose} from 'react-icons/gr';

const SearchBar = () => {
  const dispatch=useDispatch();
  const searchTerm=useSelector(selectSearchTerm);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      dispatch(searchForPost(searchTerm));
    }
  };

  const handleChange=(e)=>{
    dispatch(setSearchTerm(e.target.value));
  }

  return (
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            placeholder="search for post"
            value={searchTerm}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit"><FiSearch/></button>
        </form>
      </div>
  );
};

export default SearchBar;
