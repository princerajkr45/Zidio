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
   
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);