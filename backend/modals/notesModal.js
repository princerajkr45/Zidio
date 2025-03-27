import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    text : {
        type: String,
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Note", notesSchema);