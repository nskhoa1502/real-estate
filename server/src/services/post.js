import db from "../models";

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
    const limitedResponse = response.slice(0, 3); // Limit the response to 20 items
    return {
      response: limitedResponse,
      message: "Get posts successfully",
    };
  } catch (err) {
    throw err;
  }
};
