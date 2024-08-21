"use client";
import React, { useState } from "react";
import { SearchContext } from "./SearchContext";
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [major, setMajor] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch, major, setMajor }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
