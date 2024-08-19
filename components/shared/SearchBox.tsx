"use client";
import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebouncedCallback } from "use-debounce";
import { SearchContext } from "../context/SearchContext";

const SearchBox = () => {
  const { search, setSearch } = useContext(SearchContext);
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    setSearch(term);
  }, 1000);
  return (
    <div className="border-[1px] bg-white max-w-[260px] flex flex-row items-center rounded-md shadow-gray-400 shadow-sm gap-2 border-gray-300 pl-2">
      <CiSearch size={25} />
      <input
        type="text"
        placeholder="Search Teacher"
        className="w-full placeholder-gray-500 p-3 border-r-[2px] border-gray-200  focus:outline-none"
        // value={search}
        onChange={(e) => {
          //   setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
