import express from "express";
import {
  Register,
  Login,
  logout,
  bookmark,
  getMyProfile,
  getOtherUsers,
  follow,
  unfollow,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);
router.get("/profile/:id", isAuthenticated, getMyProfile);
router.get("/otheruser/:id", isAuthenticated, getOtherUsers);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);

export default router;
