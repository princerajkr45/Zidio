import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { addNote } from '../controllers/notes.controllers.js';

const router = express.Router();

router.post('/add-note', verifyJWT, addNote);

export default router;