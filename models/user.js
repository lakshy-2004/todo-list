import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        requeired: true,
    },
    list: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'List',
        },
    ],
});

const User = mongoose.model("User", userSchema);

export default User;