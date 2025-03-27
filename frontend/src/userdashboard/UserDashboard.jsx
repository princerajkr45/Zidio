import React, { useState } from "react";
import Task from "./Task";
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import Setting from "./Setting";
import Home from "./Home";
import DashboardNavbar from "./DashboardNavbar";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");

    const [tasks, setTasks] = useState({
        total: 50,
        important: 15,
        completed: 30,
        pending: 20,
    });

    const taskCategories = [
        { category: "Work", count: 20 },
        { category: "Personal", count: 15 },
        { category: "Urgent", count: 10 },
        { category: "Others", count: 5 },
    ];

    const [notes, setNotes] = useState("");
    const [storedNotes, setStoredNotes] = useState([]);

    const handleSaveNote = () => {
        if (notes.trim()) {
            setStoredNotes([...storedNotes, notes]);
            setNotes(""); // Clear the input field after saving
        }
    };

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar (Fixed Left) */}
                <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-screen">
                    
                    <DashboardNavbar />

                    {/* Scrollable Content Below Navbar */}
                    <div className="flex-1 overflow-auto p-6">
                        {activeTab === "home" && (
                            <Home
                                tasks={tasks}
                                taskCategories={taskCategories}
                                notes={notes}
                                setNotes={setNotes}
                                handleSaveNote={handleSaveNote}
                            />
                        )}
                        {activeTab === "task" && <Task />}
                        {activeTab === "notes" && (
                            <Notes
                                storedNotes={storedNotes}
                                setStoredNotes={setStoredNotes}
                                notes={notes}
                                setNotes={setNotes}
                            />
                        )}
                        {activeTab === "setting" && <Setting />}
                    </div>
                </div>
            </div>


            
        </>
    );
};

export default UserDashboard;
    