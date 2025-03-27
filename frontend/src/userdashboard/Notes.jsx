import axios from "axios";
import React, { useEffect } from "react";

const Notes = ({ storedNotes, setStoredNotes }) => {

    

    useEffect(() => {
        const headers = {
            id: localStorage.getItem('userId'),
            authorization: localStorage.getItem('authToken')
        }
        
        const fetchNotes = async () => {
            try {
                const response = await axios.get("http://localhost:5005/api/notes/get-notes", { headers });
                setStoredNotes(response.data.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);


    return (
        <div>
            {/* Stored Notes */}
            <h2 className="text-lg font-semibold mb-2">Stored Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 rounded-lg">
                {storedNotes.map((note, index) => (
                    <div key={index} className="rounded-lg py-4 px-4 shadow-md">
                        {note.text}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Notes;
