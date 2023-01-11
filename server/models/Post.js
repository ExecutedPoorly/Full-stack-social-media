import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            reqired: true,
        },
        firstName: {
            type: String,
            reqired: true,
        },
        lastName: {
            type: String,
            reqired: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map, 
            of: Boolean,
        },//boolean, like or remove like.
        comments: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true }
    
);

const Post = mongoose.model("Post", postSchema);

export default Post;
