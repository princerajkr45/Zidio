import Task from "../modals/taskModal.js";
import User from "../modals/userModal.js";

// Add Task

const addTask = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        const { id } = req.headers;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const validCategories = ["work", "personal","urgent", "others"];
        const validPriorities = ["low", "medium", "high"];

        if (category && !validCategories.includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({ message: "Invalid priority" });
        }

        // Create a new task without important & complete fields
        const newTask = new Task({
            title,
            description,
            category: category || "others",
            priority: priority || "Medium"
        });

        // Save the task to the database
        const savedTask = await newTask.save();

        // Add task reference to the user
        await User.findByIdAndUpdate(id, { $push: { tasks: savedTask._id } });

        res.status(201).json({ message: "Task added successfully", task: savedTask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Tasks

const getAllTasks = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: { sort: { createdAt: -1 } },
        });
        res.status(200).json({ data: userData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deleta tasks
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.headers.id;

        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Find the task and remove it
        await Task.findByIdAndDelete(taskId);

        // Remove the task from the user's tasks array
        await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description } = req.body;

        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId ,{ title: title, description: description } , {new: true});

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update important task
const updateImportantTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Check if task exists
        const task = await Task.findById(taskId);
        const importantTask = task.important;
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId, { important: !importantTask } , { new : true});

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Complete tasks
const updateCompleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Check if task exists
        const task = await Task.findById(taskId);
        const completeTask =task.complete;

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the task
       const updatedTask = await Task.findByIdAndUpdate(taskId, { complete: !completeTask } , {new : true });

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

// Get important tasks
const getImportantTasks = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            match: { important: true },
            options: { sort: { createdAt: -1 } },
        });
        const impTasksData = userData.tasks;
        res.status(200).json({ data: impTasksData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get complete tasks
const getCompletedTasks = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            match: { complete: true },
            options: { sort: { createdAt: -1 } },
        });
        const completeTasksData = userData.tasks;
        res.status(200).json({ data: completeTasksData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Get InComplete tasks
const getInCompletedTasks = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            match: { complete: false },
            options: { sort: { createdAt: -1 } },
        });
        const completeTasksData = userData.tasks;
        res.status(200).json({ data: completeTasksData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { 
    addTask, 
    getAllTasks, 
    deleteTask , 
    updateTask , 
    updateImportantTask , 
    updateCompleteTask , 
    getImportantTasks,
    getCompletedTasks,
    getInCompletedTasks
}