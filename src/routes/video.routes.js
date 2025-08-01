import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus
} from "../controllers/video.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// 🔓 Public route to view videos
router.get("/", getAllVideos);

// 🔐 Protected routes
router.post(
  "/",
  verifyJWT,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  publishAVideo
);

router
  .route("/:videoId")
  .get(getVideoById)                        // View a specific video
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo)  // Update title/desc/thumb
  .delete(verifyJWT, deleteVideo);         // Delete video

router.patch("/:videoId/toggle", verifyJWT, togglePublishStatus); // Publish/unpublish

export default router;
