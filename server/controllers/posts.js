import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath, //CHECK LATER
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find(); 

        res.status(201)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}
/* READ */
export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find(); 
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId }); //find posts that match userId
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  /* UPDATE */
  export const likePost = async (req, res) => {
    try {
      const { id } = req.params; //query string
      const { userId } = req.body; //body
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);
  
      if (isLiked) { //if userId exists, post has been liked by user. Acts to enable/disable like, boolean.
        post.likes.delete(userId); //if liked, delete.
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true } //new object
      );
  
      res.status(200).json(updatedPost); //update frontend
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
/* UPDATE */
