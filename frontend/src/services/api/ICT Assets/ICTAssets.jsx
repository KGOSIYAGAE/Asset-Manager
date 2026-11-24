import axiosInstance from "../../../utils/axiosInstance";

// Get All categories pages
export const getDeviceCategory = async (data, setCategories, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/device-catalog/category/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.categories) {
      setTotalPages(response.data.totalPages);
      return setCategories(response.data.categories);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
// Get All categories
export const getDeviceCategoryList = async (setCategories) => {
  try {
    const response = await axiosInstance.get("/device-catalog/category/", { showSpinner: true });

    if (response.data && response.data.categories) {
      return setCategories(response.data.categories);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
//add category
export const createCategory = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/device-catalog/create-category/", data, { showSpinner: true });
    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error.response);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};
//update category
export const updateCategory = async (category_id, data, showToast) => {
  try {
    if (!category_id) {
      return showToast("Category id must be provided", "error");
    }

    const response = await axiosInstance.put("/device-catalog/update-category/" + category_id, data, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};
//delete category
export const deleteCategory = async (category_id, showToast) => {
  try {
    if (!category_id) {
      return showToast("Category id must be provided", "error");
    }
    const response = await axiosInstance.put("/device-catalog/delete-category/" + category_id, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};
///////////////////////////////////////////////////////////////////////////////////////

// Get All Manufacturers pages
export const getDeviceManufactures = async (data, setManufacturers, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/device-catalog/manufacturers/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.manufactures) {
      setTotalPages(response.data.totalPages);
      return setManufacturers(response.data.manufactures);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
// Get All Manufacturers
export const getDeviceManufactureList = async (setManufactures) => {
  try {
    const response = await axiosInstance.get("/device-catalog/manufacturers/list", { showSpinner: true });

    if (response.data && response.data.manufactures) {
      return setManufactures(response.data.manufactures);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
// Get Manufacturers of a category
export const getDeviceCategoryManufacture = async (category_id, setManufactures) => {
  try {
    const response = await axiosInstance.get(`/device-catalog/manufacturers/` + category_id, { showSpinner: true });

    if (response.data && response.data.manufactures) {
      return setManufactures(response.data.manufactures);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
//update Manufacturer
export const updateManufacturer = async (manufacturer_id, data, showToast) => {
  try {
    if (!manufacturer_id) {
      return showToast("Manufacturer id must be provided", "error");
    }

    const response = await axiosInstance.put("/device-catalog/update-manufacturer/" + manufacturer_id, data, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};
//add Manufacturer
export const createManufacturer = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/device-catalog/create-manufacturer/", data, { showSpinner: true });
    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error.response);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};
//delete Manufacturer
export const deleteManufacturer = async (manufacturer_id, showToast) => {
  try {
    if (!manufacturer_id) {
      return showToast("Manufacturer id must be provided", "error");
    }
    const response = await axiosInstance.put("/device-catalog/delete-manufacturer/" + manufacturer_id, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};
///////////////////////////////////////////////////////////////////////////////////////

// Get All Models pages
export const getDeviceModels = async (data, setModels, setTotalPages) => {
  try {
    const response = await axiosInstance.get(`/device-catalog/models/?page=${data.page}&limit=${data.limit}`, { showSpinner: true });

    if (response.data && response.data.models) {
      setTotalPages(response.data.totalPages);
      return setModels(response.data.models);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
export const getDeviceManufactureModel = async (manufacture_id, setModels) => {
  try {
    const response = await axiosInstance.get(`/device-catalog/models/` + manufacture_id, { showSpinner: true });

    if (response.data && response.data.models) {
      return setModels(response.data.models);
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      return console.log(error.response.data.message);
    } else {
      return console.log("An unexpected error occured, please try again.");
    }
  }
};
//update model
export const updateModel = async (model_id, data, showToast) => {
  try {
    if (!model_id) {
      return showToast("Model id must be provided", "error");
    }

    const response = await axiosInstance.put("/device-catalog/update-model/" + model_id, data, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};
//add model
export const createModel = async (data, showToast) => {
  try {
    const response = await axiosInstance.post("/device-catalog/create-model/", data, { showSpinner: true });
    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      return showToast(error.response.data.message, "error");
    } else {
      console.log(error.response);
      return showToast("An unexpected error occured, please try again", "error");
    }
  }
};
//delete model
export const deleteModel = async (model_id, showToast) => {
  try {
    if (!model_id) {
      return showToast("Model id must be provided", "error");
    }
    const response = await axiosInstance.put("/device-catalog/delete-model/" + model_id, { showSpinner: true });

    if (response.data) {
      return showToast(response.data.message, "success");
    }
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      return showToast(error.response.data.message, "error");
    } else {
      return showToast("An unexpected error occured, please try again.", "error");
    }
  }
};
