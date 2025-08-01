import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers.js";

const router = express.Router();

// Create a new playlist (POST) ✅
router.post("/", verifyJWT, createPlaylist);

// Get all playlists for a user (GET) ✅
router.get("/user/:userId", getUserPlaylists);

// Get a single playlist by ID (GET) ✅
router.get("/:playlistId", getPlaylistById);

// Add a video to playlist (PATCH) ✅
router.patch("/:playlistId/videos/:videoId", verifyJWT, addVideoToPlaylist);

// Remove a video from playlist (DELETE) ✅
router.delete("/:playlistId/videos/:videoId", verifyJWT, removeVideoFromPlaylist);

// Delete playlist (DELETE) ✅
router.delete("/:playlistId", verifyJWT, deletePlaylist);

// Update playlist name/description (PUT) ✅
router.put("/:playlistId", verifyJWT, updatePlaylist);

export default router;
