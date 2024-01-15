import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // set jwt as HTTP_Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});

// @desc Register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout user");
});

// @desc get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get  user profile");
});

// @desc get user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update  user profile");
});

// @desc get users
// @route GET /api/users/
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get  users");
});

// @desc get users by id
// @route GET /api/users/:id
// @access private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get  users by id");
});

// @desc delete users
// @route DELETE /api/users/:id
// @access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete  user");
});

// @desc Update users
// @route DELETE /api/users/:id
// @access private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update  user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
