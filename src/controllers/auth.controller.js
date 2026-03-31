import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../configs/env.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyExists) {
      return res
        .status(409)
        .json({ msg: "Username or Email already exists..." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      msg: "User successfully registered...",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in register: ", error.message);
    return res.status(500).json({ msg: "Internal server error..." });
  }
};
