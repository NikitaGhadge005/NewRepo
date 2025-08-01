import express from "express"
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet
} from "../controllers/tweet.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = express.Router()

// @route   POST /api/v1/tweets
// @desc    Create a new tweet
// @access  Private
router.post("/", verifyJWT, createTweet)

// @route   GET /api/v1/tweets/:userId
// @desc    Get tweets by user ID
// @access  Public or Private (depends on use-case)
router.get("/:userId", getUserTweets)

// @route   PATCH /api/v1/tweets/:tweetId
// @desc    Update a tweet
// @access  Private
router.patch("/:tweetId", verifyJWT, updateTweet)

// @route   DELETE /api/v1/tweets/:tweetId
// @desc    Delete a tweet
// @access  Private
router.delete("/:tweetId", verifyJWT, deleteTweet)

export default router
