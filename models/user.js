import {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email : {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        unique: [true, "Username is taken!"],
        required: [true, "Username is required!"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

// User Model

// const User = mpdels.User model("User", UserSchema);
    // Traditional way 

const User = models.User || model("User", UserSchema);
    // In Next.js, use existing model if exists if not create one (otherwise will create model everytime it runs)

export default User;
/*
Keep in mond: 
"models" object is provided by the Mongoose ibrary and stores all the registered models.

If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.

This prevents redefining the Inodel and ensures that the existing model is reused.

If a model named "User" does not exist in the "models" object, the "model " function from Mongoose is called to create a new model

The newly created model is then assigned to the "User" variable.
*/