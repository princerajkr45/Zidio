import express from 'express';
import { 
    addTask, 
    deleteTask, 
    getAllTasks, 
    getCompletedTasks, 
    getImportantTasks, 
    updateCompleteTask, 
    updateImportantTask, 
    updateTask } 
from "../controllers/task.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post('/add-task',verifyJWT, addTask);
router.get('/get-all-tasks',verifyJWT, getAllTasks);
router.delete('/delete-task/:taskId', verifyJWT, deleteTask);
router.put('/update-task/:taskId',verifyJWT, updateTask);
router.put('/update-imp-task/:taskId',verifyJWT,updateImportantTask);
router.put('/update-complete-task/:taskId',verifyJWT,updateCompleteTask);
router.get('/get-imp-tasks',verifyJWT, getImportantTasks);
router.get('/get-complete-tasks',verifyJWT, getCompletedTasks);

export default router;