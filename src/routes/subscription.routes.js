import { Router } from "express";
import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
} from "../controllers/subscription.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Toggle subscription (subscribe/unsubscribe)
router.route("/toggle/:channelId").post(verifyJWT, toggleSubscription);

// Get subscribers of a channel
router.route("/subscribers/:channelId").get(verifyJWT, getUserChannelSubscribers);

// Get all channels the user is subscribed to
router.route("/subscriptions/:subscriberId").get(verifyJWT, getSubscribedChannels);

export default router;
