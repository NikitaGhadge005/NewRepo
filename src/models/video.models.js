import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",         // Reference to the User model
        required: true       // ✅ RECOMMENDED: video should always have an owner
    },

    title: {
         type: String,
         required: true,
         trim: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true,
        min: [0, "Duration must be positive"]
    }, 

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    }
 },
 {
    timestamps: true
 }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)