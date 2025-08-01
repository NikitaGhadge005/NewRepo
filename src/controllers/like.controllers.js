import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid Video ID");

  const existingLike = await Like.findOne({ video: videoId, likedBy: userId });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(new ApiResponse(200, {}, "Video unliked"));
  }

  await Like.create({ video: videoId, likedBy: userId });
  return res.status(200).json(new ApiResponse(200, {}, "Video liked"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) throw new ApiError(400, "Invalid Comment ID");

  const existingLike = await Like.findOne({ comment: commentId, likedBy: userId });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(new ApiResponse(200, {}, "Comment unliked"));
  }

  await Like.create({ comment: commentId, likedBy: userId });
  return res.status(200).json(new ApiResponse(200, {}, "Comment liked"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid Tweet ID");

  const existingLike = await Like.findOne({ tweet: tweetId, likedBy: userId });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(new ApiResponse(200, {}, "Tweet unliked"));
  }

  await Like.create({ tweet: tweetId, likedBy: userId });
  return res.status(200).json(new ApiResponse(200, {}, "Tweet liked"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likes = await Like.find({ likedBy: userId, video: { $exists: true } })
    .populate("video")
    .sort({ createdAt: -1 });

  const likedVideos = likes.map((like) => like.video);

  return res.status(200).json(
    new ApiResponse(200, likedVideos, "Fetched liked videos successfully")
  );
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
};
