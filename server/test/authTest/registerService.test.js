import { registerService } from "../../src/services/auth";
import { createError } from "../../src/helpers/error";
import db from "../../src/models";
import jwt from "jsonwebtoken";

// Mock các dependencies
jest.mock("../models");
jest.mock("jsonwebtoken");

describe("registerService", () => {
  test("should register a new user and return a token", async () => {
    // Mock response của db.User.findOrCreate để tạo ra new user, dùng mockResolvedValueOnce cho các hàm async
    db.User.findOrCreate.mockResolvedValueOnce([
      { id: "123", phone: "1234567890" },
      true,
    ]);

    // Mock jwt.sign để tạo ra token mới
    jwt.sign.mockReturnValue("mocked_token");

    const phone = "1234567890";
    const password = "password";
    const name = "John Doe";

    const result = await registerService({ phone, password, name });

    // Assert the expected output
    expect(result.token).toBe("mocked_token");
    expect(result.message).toBe("Register succesfully");

    // Verify that the findOrCreate function was called with the correct parameters
    expect(db.User.findOrCreate).toHaveBeenCalledWith({
      where: { phone: "1234567890" },
      defaults: {
        phone: "1234567890",
        name: "John Doe",
        password: expect.any(Function),
        id: expect.any(String),
      },
    });

    // Verify that the jwt.sign function was called with the correct parameters
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "123", phone: "1234567890" },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
  });
});
