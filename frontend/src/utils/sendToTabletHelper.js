import { getSession } from "../services/api/testApi/Test.Api";

export const handleIsSubmitted = (isSubmitted) => {
  if (isSubmitted) {
    return true;
  }
  return false;
};
