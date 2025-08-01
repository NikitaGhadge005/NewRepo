import express from "express";
import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos
} from "../controllers/like.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// ✅ Toggle like on a video
router.post("/video/:videoId", verifyJWT, toggleVideoLike);

// ✅ Toggle like on a comment
router.post("/comment/:commentId", verifyJWT, toggleCommentLike);

// ✅ Toggle like on a tweet
router.post("/tweet/:tweetId", verifyJWT, toggleTweetLike);

// ✅ Get all liked videos of current user
router.get("/videos", verifyJWT, getLikedVideos);

export default router;
