import axiosConfig from "../../axiosConfig";
import axios from "axios";

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
      url: `/api/v1/post/limit?page=${page}`,
    });
    // console.log(query);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiGetPostsFilter = async (query) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `/api/v1/post/filter`,
      params: query, // priceCode && areaCode && page
    });
    // console.log(response.data);
    // console.log(query);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiGetPostDetail = async (postId) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `/api/v1/post/post-detail/${postId}`,
    });
    // console.log(response.data);
    // console.log(query);

    return response;
  } catch (err) {
    throw err;
  }
};
export const apiGetNewPosts = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `/api/v1/post/new-post`,
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiGetPopularPosts = async (query) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `/api/v1/post/new-post`,
      params: query,
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const apiUploadImages = async (images) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      data: images,
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiCreatePost = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "post",
      url: `api/v1/post/create-new`,
      data: payload,
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiGetPostsAdmin = async (query) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `api/v1/post/post-admin`,
      params: query,
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiUpdatePost = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "put",
      url: `api/v1/post/update`,
      data: payload,
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const apiDeletePost = async (postId) => {
  try {
    const response = await axiosConfig({
      method: "delete",
      url: `api/v1/post/delete`,
      params: { postId },
    });
    // console.log(response.data);

    return response.data;
  } catch (err) {
    throw err;
  }
};
