import User from "../models/User.js";
//import {restart} from "nodemon";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; //get id from req params.
        const user = await User.findById(id); //use that id to grab user info.
        res.status(200).json(user); //send to the frontend, user info.

    } catch (err) { 
    res.statu(404).json({ message: err.message });
    }
}
export const getUserFriends = async (req, res) => {
    try{ 
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id)) //find all friends by id.
    );
    //format schema before sending back to frontend.
    const formattedFriends = friends.map(
        ({_id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);
    } catch (err) {
        restart.status(404).json({ message: err.message });
    }
    
}
/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends.filter((id) => id !== friendId); //if friend already on list, remove.
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
          user.friends.push(friendId); //adds or removes together.
          friend.friends.push(id);  
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) //find all friends by id.
        );
        //format schema before sending back to frontend.
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        restart.status(404).json({ message: err.message });
    }
}
