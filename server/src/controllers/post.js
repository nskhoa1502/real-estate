import * as service from "../services/post";

export const getPosts = async (req, res, next) => {
  try {
    const { response, message } = await service.getPostsService();
    console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
export const getPostsLimit = async (req, res, next) => {
  const { page, ...query } = req.query;
  const pageNumber = +page || 0;

  try {
    const { response, message } = await service.getPostsLimitService(
      pageNumber,
      query
    );
    console.log(message);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
