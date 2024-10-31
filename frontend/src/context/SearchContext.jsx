import { createContext, useReducer } from "react";

export const SearchContext = createContext();

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        searchResults: action.payload,
      };
    case "SET_SEARCH_NULL":
      return {
        searchResults: null,
      };

    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [searchState, searchDispatch] = useReducer(searchReducer, { searchResults: null });

  return <SearchContext.Provider value={{ searchState, searchDispatch }}>{children}</SearchContext.Provider>;
};
