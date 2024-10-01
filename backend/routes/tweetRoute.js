import express from "express";
import isAuthenticated from "../config/auth.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getFollowingTweets,
} from "../controllers/tweetController.js";
const router = express.Router();
router.post("/create", isAuthenticated, createTweet);
router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeOrDislike);
router.get("/alltweets/:id", isAuthenticated, getAllTweets);
router.get("/followingtweets/:id", isAuthenticated, getFollowingTweets);
export default router;
