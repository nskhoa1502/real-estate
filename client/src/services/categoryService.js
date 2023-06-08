import axiosConfig from "../axiosConfig";

export const apiGetCategories = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/category/all",
    });
    return response;
  } catch (err) {
    throw err;
  }
};