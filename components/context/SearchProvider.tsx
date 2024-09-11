"use client";
import React, { useState } from "react";
import { SearchContext } from "./SearchContext";
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        major,
        setMajor,
        year,
        setYear,
        term,
        setTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
