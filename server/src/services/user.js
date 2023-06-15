import db from "../models";

// GET current user
export const getOneUserService = async (id) => {
  try {
    const response = await db.User.findOne({
      where: { id },
      raw: true,
      attributes: {
        exclude: [`password`],
      },
    });

    console.log(response);
    return { response: response, message: "Fetch current user success" };
  } catch (err) {
    throw err;
  }
};
