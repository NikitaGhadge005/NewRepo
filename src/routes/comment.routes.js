import express from "express";
import { getVideoComments, addComment, updateComment, deleteComment } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Public
router.get("/:videoId", getVideoComments);

// Protected
router.post("/:videoId", verifyJWT, addComment);
router.put("/:commentId", verifyJWT, updateComment);
router.delete("/:commentId", verifyJWT, deleteComment);

export default router;
