import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app= express()

app.use(cors({
     origin : process.env.CORS_ORIGIN ,
     credentials:true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({limit:"20kb",extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


// Routes Import 

import userRouter from "./routes/user.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";


// User Route
app.use("/api/v1/user/",userRouter)
// Subscription Route
app.use("/api/v1/subscription/",subscriptionRouter)

// Video Route
app.use("/api/v1/video/",videoRouter)

// Playlist Route
app.use("/api/v1/playlist/",playlistRouter)

// Tweet Route
app.use("/api/v1/tweets/",tweetRouter)

// Comment Route
app.use("/api/v1/comment/",commentRouter)

// Like Route
app.use("/api/v1/like/",likeRouter)

// Dashboard Route
app.use("/api/v1/dashboard/",dashboardRouter)









export {app}