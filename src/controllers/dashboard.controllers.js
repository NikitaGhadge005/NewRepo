import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get stats of a user's channel
const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const totalVideos = await Video.countDocuments({ owner: userId });

  const videoStats = await Video.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userId) } },
    {       $group: {
        _id: null,
        totalViews: { $sum: "$views" },
        totalLikes: { $sum: "$likesCount" } // Assuming you track likes count in video model
      }
    }
  ]);

  const totalSubscribers = await Subscription.countDocuments({ channel: userId });

  const stats = {
    totalVideos,
    totalViews: videoStats[0]?.totalViews || 0,
    totalLikes: videoStats[0]?.totalLikes || 0,
    totalSubscribers
  };

  return res.status(200).json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});

// Get all videos of the channel
const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const videos = await Video.find({ owner: userId })
    .populate("owner", "username avatar")
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
