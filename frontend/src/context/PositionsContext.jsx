import { createContext, useReducer } from "react";

export const PositionsContext = createContext();

export const positionReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSITIONS":
      return {
        positionList: action.payload,
      };
    case "CREATE_CREATE":
      return {
        positionList: [state, ...action.payload],
      };
    default:
      return state;
  }
};

export const PositionsContextProvider = ({ children }) => {
  const [positionState, positionDispatch] = useReducer(positionReducer, { positionList: null });

  return <PositionsContext.Provider value={{ positionState, positionDispatch }}>{children}</PositionsContext.Provider>;
};
