import { createError } from "../helpers/error";
import * as service from "../services/post";

export const getPosts = async (req, res, next) => {
  try {
    const { response, message } = await service.getPostsService();
    // console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const getPostsLimit = async (req, res, next) => {
  const { page } = req.query;
  // console.log(page);
  const pageNumber = +page || 0;

  try {
    const { response, message } = await service.getPostsLimitService(
      pageNumber
    );
    // console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const getPostsFilterLimit = async (req, res, next) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  const pageNumber = +page || 0;
  // console.log(req.query);

  try {
    const { response, message } = await service.getPostsFilterService(
      pageNumber,
      query,
      { priceNumber, areaNumber }
    );
    // console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const getPostsAdmin = async (req, res, next) => {
  const { page, ...query } = req.query;
  const pageNumber = +page || 1;
  const { id } = req.user;

  // console.log(`this route is called`);

  if (!id) return createError(400, "Could not find user with token");
  try {
    const { response, message } = await service.getPostsAdminService(
      pageNumber,
      query,
      id
    );
    // console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getNewPosts = async (req, res, next) => {
  try {
    const { response, message } = await service.getNewPostService();
    // console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const createNewPost = async (req, res, next) => {
  const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
  const { id } = req.user;

  try {
    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
      return createError(400, "Missing input");

    const { response, message } = await service.createNewPostService(
      req.body,
      id
    );
    return res.status(200).json({ response, message });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  const { postId, attributesId, overviewsId, imagesId, ...body } = req.body;

  const { id } = req.user;

  try {
    if (!id || !postId || !attributesId || !overviewsId || !imagesId)
      return createError(400, "Missing inputs");

    const { response, message } = await service.updatePostService(req.body);
    return res.status(200).json({ response, message });
  } catch (err) {
    next(err);
  }
};
export const deletePost = async (req, res, next) => {
  const { postId } = req.query;
  // console.log(postId);

  const { id } = req.user;

  try {
    if (!id || !postId) return createError(400, "Missing ids");

    const { response, message } = await service.deletePostService(postId);
    return res.status(200).json({ response, message });
  } catch (err) {
    next(err);
  }
};
export const getOnePost = async (req, res, next) => {
  const postId = req.params.postId;
  // console.log(postId);

  try {
    if (!postId) return createError(400, "Missing ids");

    const { response, message } = await service.getOnePostService(postId);
    return res.status(200).json({ response, message });
  } catch (err) {
    next(err);
  }
};
