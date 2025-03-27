import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true ,
        unique: true
    },

    description: {
         type: String, 
         required: true, 
         unique: true 
    },
    
    important: { 
        type: Boolean, 
        default: false
    },
    complete: { 
        type: Boolean, 
        default: false
    },
    category: {
        type: String,
        enum: ["work", "personal","urgent", "others"],
        default: "others"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "Medium"
    },
   
   
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);