// src/components/NotesTab.js
import React, { useState } from "react";

const Notes = ({ storedNotes, setStoredNotes, notes, setNotes }) => {
    const handleSaveNote = () => {
        if (notes.trim()) {
            setStoredNotes([...storedNotes, notes]);
            setNotes(""); // Clear the input field after saving
        }
    };

    return (
        <div>
            {/* Stored Notes */}
            <h2 className="text-lg font-semibold mb-2">Stored Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 rounded-lg">
                {storedNotes.map((note, index) => (
                    <div key={index} className="rounded-lg py-4 px-4 shadow-md">
                        {note}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Notes;
