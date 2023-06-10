import db from "../models";
require("dotenv").config();

export const getPostsService = async () => {
  try {
    const response = await db.Post.findAll({
      raw: true,
      attributes: [`id`, `title`, `star`, `address`, `description`],
      nest: true,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone"],
        },
      ],
    });
    const limitedResponse = response.slice(0, 10); // Limit the response to 20 items
    return {
      response: limitedResponse,
      message: "Get posts successfully",
    };
  } catch (err) {
    throw err;
  }
};

export const getPostsLimitService = async (page) => {
  try {
    const offset = page === 1 ? 0 : page - 1;
    const response = await db.Post.findAndCountAll({
      raw: true,
      offset: offset * +process.env.LIMIT || 0,
      limit: +process.env.LIMIT,

      attributes: [`id`, `title`, `star`, `address`, `description`],
      nest: true,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone"],
        },
      ],
    });
    // const limitedResponse = response.slice(0, 10); // Limit the response to 20 items
    return {
      response: response,
      message: "Get posts successfully",
    };
  } catch (err) {
    throw err;
  }
};
