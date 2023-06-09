import * as service from "../services/post";

export const getPosts = async (req, res, next) => {
  try {
    const { response, message } = await service.getPostsService();
    return res.status(200).json({ message, response });
  } catch (err) {
    next(err);
  }
};
