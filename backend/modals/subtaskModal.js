import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    title: {

        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false

    }
});

export default subtaskSchema;  