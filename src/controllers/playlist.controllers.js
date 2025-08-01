import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Create a playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user._id;

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: userId
    });

    return res.status(201).json(new ApiResponse(201, playlist, "Playlist created"));
});

// ✅ Get all playlists by a user
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const playlists = await Playlist.find({ owner: userId }).populate("videos");

    return res.status(200).json(new ApiResponse(200, playlists, "User playlists fetched"));
});

// ✅ Get a single playlist by ID
const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID");
    }

    const playlist = await Playlist.findById(playlistId).populate("videos");

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched"));
});

// ✅ Add a video to playlist
const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Video not found");

    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already in playlist");
    }

    playlist.videos.push(videoId);
    await playlist.save();

    return res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist"));
});

// ✅ Remove a video from playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    playlist.videos = playlist.videos.filter(
        (id) => id.toString() !== videoId
    );

    await playlist.save();

    return res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist"));
});

// ✅ Delete a playlist
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    return res.status(200).json(new ApiResponse(200, {}, "Playlist deleted"));
});

// ✅ Update playlist name/description
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");

    if (name) playlist.name = name;
    if (description) playlist.description = description;

    await playlist.save();

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist updated"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
};
