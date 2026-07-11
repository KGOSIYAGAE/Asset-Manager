import axiosInstance from "../../../utils/axiosInstance";

//add device api
export const createRepair = async (data) => {
  try {
    const response = await axiosInstance.post("/repairs/create-repair", data, { showSpinner: true });
    if (response.data) {
      return { response: response.data };
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return { response: error.response.data };
    } else {
      console.log(error.response);
      return { message: "An unexpected error occured, please try again" };
    }
  }
};

//Get All repairs
export const getAllRepairs = async (data, setAllRepairs, setTotalPages, userDetails) => {
  try {
    const response = await axiosInstance.get(`/repairs/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data.deviceList) {
      setTotalPages(response.data.totalPages);
      return setAllRepairs(response.data.deviceList);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get All repairs for tech
export const getAllRepairsForTech = async (data, setAllRepairs, setTotalPages, userDetails) => {
  try {
    const response = await axiosInstance.get(`/repairs/assigned?page=${data.page}&limit=${data.limit}&userId=${data.userId}`, { showSpinner: true });

    if (response.data.deviceList) {
      setTotalPages(response.data.totalPages);
      return setAllRepairs(response.data.deviceList);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get All repairs stats
export const getAllRepairsStats = async (setAllRepairsStats) => {
  try {
    const response = await axiosInstance.get(`/repairs/all-stats`, { showSpinner: true });

    if (response.data.allRepairsStats) {
      return setAllRepairsStats(...response.data.allRepairsStats);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};

//Get All repairs stats
export const getAllRepairsStatsForTech = async (data, setAllRepairsStats) => {
  try {
    const response = await axiosInstance.get(`/repairs/all-stats-tech?userId=${data.userId}`, { showSpinner: true });

    if (response.data.allRepairsStats) {
      return setAllRepairsStats(...response.data.allRepairsStats);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data);
    } else {
      return console.log("An unexpected error occured, please try again");
    }
  }
};
