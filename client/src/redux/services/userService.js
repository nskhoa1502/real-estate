import axiosConfig from "../../axiosConfig";

export const apiGetCurrent = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/user/get-current",
    });
    // console.log(response.data.response);
    return response.data.response;
  } catch (err) {
    throw err;
  }
};
