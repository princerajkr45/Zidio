import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Task'
        },
    ],
    profile:{
        type: String,
        default: "default.png"
    }

}, { timestamps: true });

export default mongoose.model("User", userSchema);