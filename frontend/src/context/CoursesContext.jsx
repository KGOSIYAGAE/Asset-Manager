import { createContext, useReducer } from "react";

export const CourseContext = createContext();

export const courseReducer = (state, action) => {
  switch (action.type) {
    case "SET_COURSES":
      return {
        courseList: action.payload,
      };
    case "CREATE_COURSE":
      return {
        courseList: [state, ...action.payload],
      };
    default:
      return state;
  }
};

export const CourseContextProvider = ({ children }) => {
  const [courseState, courseDispatch] = useReducer(courseReducer, { courseList: null });

  return <CourseContext.Provider value={{ courseState, courseDispatch }}>{children}</CourseContext.Provider>;
};
