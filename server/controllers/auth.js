import bcrypt from "bcrypt"; //allow encryption
import jwt from "jsonwebtoken"; //gives user web tokens for auth.
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {  //calls to db are async. Takes requested body from front end, send (response) back.
    try {
        const {
            fistName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
    
        } = req.body; //frontend should be sending a matching object with these parameters/arguments.

        const salt = await bcrypt.genSalt(); //random salt to encrypt.
        const passwordHash = await bcrypt.hash(password, salt); //encrypts with random salt.

        const newUser = new User({ 
            fistName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), //random
            impressions: Math.floor(Math.random() * 10000), //random
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //sends .json of user back if no error;
    } catch (err) {
        res.status(500).json({ error: err.message});

    }
}
/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; //gets arguments from "req.body".
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({msg: "User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; //keep from being sent to frontend
        res.status(200).json({ token, user})
    }
    catch {
        res.status(500).json({ error: err.message });

    }
}