import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export const useSearchContext = () => {
  const searchResults = useContext(SearchContext);

  if (!searchResults) {
    throw new Error("useSearchContext should be used inside searchContextProvider");
  }

  return searchResults;
};
