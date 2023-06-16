import axiosConfig from "../../axiosConfig";
import axiosDefault from "axios";

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
export const apiGetProvinces = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/province/all",
    });
    // console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

export const apiGetPublicProvinces = async (payload) => {
  try {
    const response = await axiosDefault({
      method: "get",
      url: "https://vapi.vnappmob.com/api/province",
    });
    // console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
export const apiGetPublicDistrict = async (provinceId) => {
  try {
    const response = await axiosDefault({
      method: "get",
      url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
    });
    // console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
