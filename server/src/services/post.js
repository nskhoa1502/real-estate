import db from "../models";
import { Op } from "sequelize";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
import { generateCode } from "../utils/generateCode";
import moment from "moment";
import generateDate from "../utils/generateDate";

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

export const getPostsLimitService = async (pageNumber) => {
  try {
    const offset = pageNumber === 1 ? 0 : pageNumber - 1;
    const limit = +process.env.LIMIT;
    // console.log(query);

    const response = await db.Post.findAndCountAll({
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
      order: [["createdAt", "DESC"]], // Sort by star property in descending order
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

export const getPostsFilterService = async (
  pageNumber,
  query,
  { priceNumber, areaNumber }
) => {
  try {
    const offset = pageNumber === 1 ? 0 : pageNumber - 1;
    const limit = +process.env.LIMIT;
    // console.log(query);

    const queries = { ...query };
    if (priceNumber && priceNumber.length > 0)
      queries.priceNumber = { [Op.between]: priceNumber };
    if (areaNumber && areaNumber.length > 0)
      queries.areaNumber = { [Op.between]: areaNumber };

    const response = await db.Post.findAndCountAll({
      where: queries,
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
      order: [["createdAt", "DESC"]], // Sort by star property in descending order
      offset: offset * limit,

      limit: limit,
    });

    return {
      response: response,
      message: "Get posts filter successfully",
    };
  } catch (err) {
    throw err;
  }
};

export const getNewPostService = async (pageNumber) => {
  try {
    const offset = pageNumber === 1 ? 0 : pageNumber - 1;
    const limit = +process.env.LIMIT;
    // console.log(query);

    const response = await db.Post.findAll({
      raw: true,
      attributes: ["id", "title", "star", "createdAt"],
      nest: true,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price"],
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: 0,

      limit: limit,
    });

    return {
      response: response,
      message: "Get new posts successfully",
    };
  } catch (err) {
    throw err;
  }
};
export const createNewPostService = async (body, userId) => {
  try {
    const attributesId = uuidv4();
    const imagesId = uuidv4();
    const overviewId = uuidv4();
    const labelCode = generateCode(body.label);
    const hashtag = `${Math.floor(Math.random() * Math.pow(10, 6))}`;
    const currentDate = generateDate();
    const provinceValue = body?.province?.replace(/^(Thành phố |Tỉnh)/, "");
    const provinceCode = generateCode(provinceValue);

    const response = await db.Post.create({
      id: uuidv4(),
      title: body?.title || null,
      labelCode,
      address: body?.address || null,
      attributesId,
      categoryCode: body?.categoryCode || null,
      description: JSON.stringify(body?.description) || null,
      userId,
      overviewId,
      imagesId,
      areaCode: body?.areaCode || null,
      priceCode: body?.priceCode || null,
      provinceCode: provinceCode || null,
      priceNumber: body?.priceNumber,
      areaNumber: body?.areaNumber,
    });

    await db.Attribute.create({
      id: attributesId,
      price:
        +body?.priceNumber < 1
          ? `${(+body?.priceNumber * 1000000).toLocaleString(
              "vi-VI"
            )} đồng/tháng`
          : `${body?.priceNumber} triệu/tháng`,
      acreage: `${body.areaNumber} m\u00B2`,
      published: moment(new Date()).format("DD/MM/YYYY"),
      hashtag: `#${hashtag}`,
    });

    await db.Image.create({
      id: imagesId,
      image: JSON.stringify(body?.images),
    });

    await db.Overview.create({
      id: overviewId,
      code: `#${hashtag}`,
      area: body?.label,
      type: body?.categoryName,
      target: body?.target,
      bonus: "Tin thường",
      created: currentDate.today,
      expired: currentDate.expired,
    });

    await db.Province.findOrCreate({
      where: {
        value: provinceValue,
      },
      defaults: {
        code: provinceCode,
        value: provinceValue,
      },
    });

    await db.Label.findOrCreate({
      where: {
        code: labelCode,
      },
      defaults: {
        code: labelCode,
        value: body?.label,
      },
    });

    return {
      response: response,
      message: "New post created successfully",
    };
  } catch (err) {
    throw err;
  }
};

export const getPostsAdminService = async (pageNumber, query, id) => {
  try {
    const offset = pageNumber === 1 ? 0 : pageNumber - 1;
    const limit = +process.env.LIMIT;
    // console.log(query);

    const queries = { ...query, userId: id };

    const response = await db.Post.findAndCountAll({
      where: queries,
      raw: true,
      // attributes: ["id", "title", "star", "address", "description"],
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
        {
          model: db.Overview,
          as: "overviews",
        },
      ],
      order: [["createdAt", "DESC"]], // Sort by star property in descending order
      offset: offset * limit,

      limit: limit,
    });

    return {
      response: response,
      message: "Get posts filter successfully",
    };
  } catch (err) {
    throw err;
  }
};
export const updatePostService = async ({
  postId,
  attributesId,
  overviewsId,
  imagesId,
  ...body
}) => {
  try {
    const labelCode = generateCode(body.label);
    // const hashtag = `${Math.floor(Math.random() * Math.pow(10, 6))}`;
    const currentDate = generateDate();
    const provinceValue = body?.province?.replace(/^(Thành phố |Tỉnh)/, "");
    const provinceCode = generateCode(provinceValue);

    const response = await db.Post.update(
      {
        title: body?.title || null,
        labelCode,
        address: body?.address || null,
        categoryCode: body?.categoryCode || null,
        description: JSON.stringify(body?.description) || null,
        overviewId: overviewsId,
        areaCode: body?.areaCode || null,
        priceCode: body?.priceCode || null,
        provinceCode: provinceCode || null,
        priceNumber: body?.priceNumber,
        areaNumber: body?.areaNumber,
      },
      {
        where: { id: postId },
      }
    );

    await db.Attribute.update(
      {
        price:
          +body?.priceNumber < 1
            ? `${(+body?.priceNumber * 1000000).toLocaleString(
                "vi-VI"
              )} đồng/tháng`
            : `${body?.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m\u00B2`,
      },
      {
        where: { id: attributesId },
      }
    );

    await db.Image.update(
      {
        image: JSON.stringify(body?.images),
      },
      {
        where: { id: imagesId },
      }
    );

    await db.Overview.update(
      {
        area: body?.label,
        type: body?.categoryName,
        target: body?.target,
      },
      { where: { id: overviewsId } }
    );

    await db.Province.findOrCreate({
      where: {
        value: provinceValue,
      },
      defaults: {
        code: provinceCode,
        value: provinceValue,
      },
    });

    await db.Label.findOrCreate({
      where: {
        code: labelCode,
      },
      defaults: {
        code: labelCode,
        value: body?.label,
      },
    });
    // console.log(response);
    return {
      response: response,
      message: "Update post successfully",
    };
  } catch (err) {
    throw err;
  }
};

export const deletePostService = async (postId) => {
  try {
    // console.log(`post service`, postId);
    const response = await db.Post.destroy({
      where: { id: postId },
      cascade: true,
    });

    return {
      response: response,
      message: response[0] > 0 ? "Update post successfully" : "Delete failed",
    };
  } catch (err) {
    throw err;
  }
};
