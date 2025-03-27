import express from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { addNote, getAllNotes } from '../controllers/notes.controllers.js';

const router = express.Router();

router.post('/add-note', verifyJWT, addNote);
router.get('/get-notes', verifyJWT, getAllNotes);

export default router;