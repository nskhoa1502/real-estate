import axiosConfig from "../../axiosConfig";

export const apiRegister = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "post",
      url: "/api/v1/auth/register",
      data: payload,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const apiLogin = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "post",
      url: "/api/v1/auth/login",
      data: payload,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
// export const apiLogout = async () => {
//   try {
//     const response = await axiosConfig({
//       method: "post",
//       url: "/api/v1/auth/logout",
//     });
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };
