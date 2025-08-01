import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

  const matchQuery = {
    isPublished: true,
    ...(query && { title: { $regex: query, $options: "i" } }),
    ...(userId && { owner: userId })
  };

  const sortOptions = {
    [sortBy]: sortType === "asc" ? 1 : -1
  };

  const aggregateQuery = Video.aggregate([{ $match: matchQuery }, { $sort: sortOptions }]);
  const options = { page: parseInt(page), limit: parseInt(limit) };

  const result = await Video.aggregatePaginate(aggregateQuery, options);
  res.status(200).json(new ApiResponse(200, result));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!req.files || !req.files.video || !req.files.thumbnail) {
    throw new ApiError(400, "Video and thumbnail are required");
  }

  const videoFile = await uploadOnCloudinary(req.files.video[0].path);
  const thumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);

  const video = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    duration: 0,
    owner: req.user._id
  });

  res.status(201).json(new ApiResponse(201, video, "Video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid Video ID");

  const video = await Video.findById(videoId).populate("owner", "username avatar");
  if (!video) throw new ApiError(404, "Video not found");

  res.status(200).json(new ApiResponse(200, video));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");
  if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Not authorized");

  if (title) video.title = title;
  if (description) video.description = description;

  if (req.file) {
    const thumbnail = await uploadOnCloudinary(req.file.path);
    video.thumbnail = thumbnail.url;
  }

  await video.save();
  res.status(200).json(new ApiResponse(200, video, "Video updated"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");
  if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Not authorized");

  await video.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Video deleted"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");
  if (video.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Not authorized");

  video.isPublished = !video.isPublished;
  await video.save();

  res.status(200).json(new ApiResponse(200, video, `Video is now ${video.isPublished ? "published" : "unpublished"}`));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus
};
