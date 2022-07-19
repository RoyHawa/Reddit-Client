import React, { useState } from "react";
import './SearchBar.css';
import {FiSearch} from 'react-icons/fi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm){
      console.log(searchTerm);
      setSearchTerm("");
    }
  };

  return (
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            placeholder="search for post"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><FiSearch/></button>
        </form>
      </div>
  );
};

export default SearchBar;
