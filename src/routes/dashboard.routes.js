// src/routes/channel.routes.js

import express from "express";
import { getChannelStats, getChannelVideos } from "../controllers/channel.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Route to get channel statistics (protected)
router.get("/stats", verifyJWT, getChannelStats);

// Route to get all videos uploaded by the channel (protected)
router.get("/videos", verifyJWT, getChannelVideos);

export default router;