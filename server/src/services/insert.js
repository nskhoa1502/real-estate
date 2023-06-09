import db from "../models";
import bcrypt from "bcryptjs";
import { createError } from "../helpers/error";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
import nhachothue from "../data/nha-cho-thue.json";
import chothuephongtro from "../data/cho-thue-phong-tro.json";
import chothuecanho from "../data/cho-thue-can-ho.json";
import chothuematbang from "../data/cho-thue-mat-bang.json";
import { generateCode } from "../utils/generateCode";
import { categories } from "../constant/constant";

const dataBodies = [nhachothue, chothuephongtro, chothuecanho, chothuematbang];

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = async () => {
  try {
    for (const dataBody of dataBodies) {
      for (const page of dataBody) {
        for (const item of page.body) {
          let labelCode = generateCode(item?.header?.class?.classType);
          let postId = uuidv4();
          let attributesId = uuidv4();
          let userId = uuidv4();
          let imagesId = uuidv4();
          let overviewId = uuidv4();
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: "NCT",
            description: JSON.stringify(item?.mainContent?.content),
            userId,
            overviewId,
            imagesId,
          });

          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });

          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });
          await db.Label.findOrCreate({
            where: { code: labelCode },
            defaults: {
              code: labelCode,
              value: item?.header?.class?.classType,
            },
          });
          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overview?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overview?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overview?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: item?.overview?.content.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expired: item?.overview?.content.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
          });

          await db.User.create({
            id: userId,
            name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
              ?.content,
            password: hashPassword("123456"),
            phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
              ?.content,
            zalo: item?.contact?.content.find((i) => i.name === "Zalo")
              ?.content,
          });
        }
      }
    }

    for (const category of categories) {
      await db.Category.create({
        code: category.code,
        value: category.value,
        header: category.header,
        subheader: category.subheader,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return "Insert data successfully";
  } catch (err) {
    throw err;
  }
};
