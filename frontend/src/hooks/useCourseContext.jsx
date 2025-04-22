import { useContext } from "react";
import { CourseContext } from "../context/CoursesContext";

export const useCourseContext = () => {
  const courses = useContext(CourseContext);

  if (!courses) {
    throw new Error("useCourseContext should be used inside CourseContextProvider");
  }

  return courses;
};
