import axiosInstance from "../../../utils/axiosInstance";

//get all positions
export const getAllPositions = async (positionsDispatch) => {
  try {
    const response = await axiosInstance.get("/api/positions/");

    if (!response.data.error) {
      positionsDispatch({ type: "SET_POSITIONS", payload: response.data.positionList });
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};
