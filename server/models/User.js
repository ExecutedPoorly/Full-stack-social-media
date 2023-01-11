import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true, //=required input.
            min: 2,  //min length.
            max: 50, // max length
        },

        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,           
        },

        email: { 
            type: String,
            required: true,
            max: 50,
            unique: true,  //unique prevents shared emails.         
        },

        password: { 
            type: String,
            required: true,
            min: 50,        
        },

        picturePath: { 
            type: String,
            default: "", //default input if nothing entered.
        },

        friends: {
            type: Array, //Multiple friend objects.
            default: [],
        },
        location: String, //Values are simple and do not require additional parameters.
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
        
    

 }, 
 { timestamps: true } //adds automatic dates to entries.
 );
//Model makes a copy of schema, include hooks, etc. beforehand. 
// mongoose.model(<Collectionname>, <CollectionSchema>)
 const User = mongoose.model("User", UserSchema);
 export default User;