import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChange = (newValue) => {
    setSearchValue(newValue);
  };

  return (
    <SearchContext.Provider value={{ searchValue, handleSearchInputChange }}>
      {children}
    </SearchContext.Provider>
  );
};
