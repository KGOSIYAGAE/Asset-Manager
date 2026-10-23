import axiosInstance from "../../../utils/axiosInstance";

//get All Students
export const getSearchResults = async (data, setSearchResults, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/search/`, { params: data });

    if (!response.data.error) {
      setTotalPages(response.data.totalPages);
      return setSearchResults(response.data.searchResults);
    }
  } catch (error) {
    if (error.response && error.response.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};
