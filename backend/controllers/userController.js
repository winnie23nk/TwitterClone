import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exist.",
        success: false,
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 16);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign({ tokenData }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: `Welcome back ${user.name} `,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logged out successfully.",
    success: true,
  });
};
export const bookmark = async (req, res) => {
  try {
    const userId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(userId);
    if (user.bookmarks.includes(tweetId)) {
      await User.findByIdAndUpdate(userId, { $pull: { bookmarks: tweetId } });
      return res.status(200).json({
        success: true,
        message: "tweet removed from bookmarks",
      });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { bookmarks: tweetId } });
      return res.status(200).json({
        success: true,
        message: "tweet added to bookmarks",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );
    if (!otherUsers) {
      return res.status(401).json({
        message: "No other Users exist",
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);
    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: userId } });
    } else {
      return res.status(401).json({
        message: `${loggedInUser.name} already follows ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} now follows ${user.name}`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);
    if (user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $pull: { following: userId } });
    } else {
      return res.status(401).json({
        message: `${loggedInUser.name} does not follow  ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} unfollowed ${user.name}`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
