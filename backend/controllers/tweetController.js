import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";
export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required.",
        success: false,
      });
    }
    const user = await User.findById(id).select("-password");

    await Tweet.create({
      description,
      userId: id,
      userDetails: user,
    });

    return res.status(201).json({
      message: "Tweet created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error: error.message });
  }
};
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(402).json({
      success: true,
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const likeOrDislike = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.body.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(userId)) {
      await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: userId } });
      return res.status(200).json({
        success: true,
        message: "tweet disliked successfully",
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, { $push: { like: userId } });
      return res.status(200).json({
        success: true,
        message: "tweet liked successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({ userId: id });
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweets),
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      tweets: [].concat(...followingUserTweets),
    });
  } catch (error) {
    console.log(error.message);
  }
};
