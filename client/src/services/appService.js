import axiosConfig from "../axiosConfig";

export const apiGetPrices = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/price/all",
    });

    // console.log(response.data);
    return response;
  } catch (err) {
    throw err;
  }
};
export const apiGetAreas = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/area/all",
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const apiGetCategories = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/category/all",
    });
    // console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
