import Note from '../modals/notesModal.js';

// create a new note
const addNote = async (req, res) => {
    try {
        const { text } = req.body;
        const {id} =req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        if (!text) {
            return res.status(400).json({ message: "Note text is required" });
        }
        const newNote = new Note({ text });
        await newNote.save();

        res.status(201).json({ message: "Note added successfully", data: newNote });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json({ data: notes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export { addNote, getAllNotes };