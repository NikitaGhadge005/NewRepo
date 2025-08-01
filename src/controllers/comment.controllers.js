import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Get all comments for a video (with pagination)
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const commentsAggregate = Comment.aggregate([
    { $match: { video: new mongoose.Types.ObjectId(videoId) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails"
      }
    },
    {
      $unwind: "$ownerDetails"
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        owner: {
          _id: "$ownerDetails._id",
          fullName: "$ownerDetails.fullName",
          avatar: "$ownerDetails.avatar"
        }
      }
    }
  ]);

  const options = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  const comments = await Comment.aggregatePaginate(commentsAggregate, options);

  res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

// ✅ Add a comment to a video
const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id
  });

  res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
});

// ✅ Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to edit this comment");
  }

  comment.content = content;
  await comment.save();

  res.status(200).json(new ApiResponse(200, comment, "Comment updated successfully"));
});

// ✅ Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this comment");
  }

  await comment.deleteOne();

  res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment
};
