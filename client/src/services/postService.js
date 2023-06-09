import axiosConfig from "../axiosConfig";

// export const apiGetPosts = async (payload) => {
//   try {
//     const response = await axiosConfig({
//       method: "get",
//       url: "/api/v1/post/all",
//     });
//     const limitedData = response.data.slice(0, 10); // Limit the data to 10 items
//     return limitedData;
//   } catch (err) {
//     throw err;
//   }
// };
export const apiGetPostsLimit = async (page) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `/api/v1/post/limit?page=${page || 1}`,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
