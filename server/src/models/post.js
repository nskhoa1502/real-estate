"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Image, {
        foreignKey: "imagesId",
        targetKey: "id",
        as: "images",
        onDelete: "CASCADE",
      });
      Post.belongsTo(models.Attribute, {
        foreignKey: "attributesId",
        targetKey: "id",
        as: "attributes",
      });
      Post.belongsTo(models.Overview, {
        foreignKey: "overviewId",
        targetKey: "id",
        as: "overviews",
        onDelete: "CASCADE",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
        onDelete: "CASCADE",
      });
      Post.belongsTo(models.Label, {
        foreignKey: "labelCode",
        targetKey: "code",
        as: "labelData",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      labelCode: DataTypes.STRING,
      address: DataTypes.STRING,
      attributesId: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      provinceCode: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.STRING,
      overviewId: DataTypes.STRING,
      imagesId: DataTypes.STRING,
      priceNumber: DataTypes.FLOAT,
      areaNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
