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

export const getPostsLimitService = async (pageNumber, query) => {
  try {
    const offset = pageNumber === 1 ? 0 : pageNumber - 1;
    const limit = +process.env.LIMIT;
    // console.log(query);

    const response = await db.Post.findAndCountAll({
      where: query,
      raw: true,
      attributes: ["id", "title", "star", "address", "description"],
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
      order: [["star", "DESC"]], // Sort by star property in descending order
      offset: offset * limit,
      limit: limit,
    });

    return {
      response: response,
      message: "Get posts successfully",
    };
  } catch (err) {
    throw err;
  }
};
