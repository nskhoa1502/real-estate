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

    // console.log(response);
    return { response: response, message: "Fetch current user success" };
  } catch (err) {
    throw err;
  }
};
export const updateUserService = async (id, payload) => {
  try {
    const response = await db.User.update(payload, {
      where: { id },
    });

    // console.log(response);
    return {
      response: response,
      message:
        response[0] > 0 ? "Update user successfully" : "Failed to update user",
    };
  } catch (err) {
    throw err;
  }
};
