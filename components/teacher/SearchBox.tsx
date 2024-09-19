"use client";
import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebouncedCallback } from "use-debounce";
import { SearchContext } from "../context/SearchContext";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBox = ({ placeholder }) => {
  const { search, setSearch } = useContext(SearchContext);
  const handleSearch = useDebouncedCallback((term) => {
    setSearch(term);
  }, 1000);
  return (
    // <div className=" flex items-center space-x-2 max-w-60 border-border border-2 p-2 rounded-md">
    // {/* <Search size={25} className="text-border" /> */}
    <Input
      type="text"
      placeholder={placeholder}
      // className="w-full  focus:outline-none"
      // value={search}
      onChange={(e) => {
        //   setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    ></Input>
    // </div>
  );
};

export default SearchBox;
