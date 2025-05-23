import React, { useState ,useEffect } from "react";
import axios from "axios";
import Task from "./Task";
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import Setting from "./Setting";
import Home from "./Home";
import DashboardNavbar from "./DashboardNavbar";
import AllTasks from "../pages/AllTasks";
import CompletedTasks from "../pages/CompletedTasks";
import ImportantTasks from "../pages/ImportantTasks";
import InCompletedTasks from "../pages/IncompletedTasks";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");

    const [tasks, setTasks] = useState({
        total: 0,
        important: 0,
        completed: 0,
        pending: 0,
    });

    const[name , setName] = useState("");
    
    const [taskCategories, setTaskCategories] = useState([]);

    const [notes, setNotes] = useState("");
    const [storedNotes, setStoredNotes] = useState([]);

    const headers = {
        id: localStorage.getItem('userId'),
        authorization: localStorage.getItem('authToken')
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5005/api/tasks/get-all-tasks",{headers}); 
                const taskData = response.data.data.tasks; 
               
                setName(response.data.data.name);
            

                // Count different types of tasks
                const totalTasks = taskData.length;
                const importantTasks = taskData.filter(task => task.important).length;
                const completedTasks = taskData.filter(task => task.complete).length;
                const pendingTasks = totalTasks - completedTasks;

                // Count tasks by category
                const categoryCounts = taskData.reduce((acc, task) => {
                    const category = task.category || "Others"; 
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});

                // Convert categoryCounts object into an array for easier rendering
                const formattedCategories = Object.keys(categoryCounts).map(category => ({
                    category,
                    count: categoryCounts[category],
                }));

                // Update state with new values
                setTasks({
                    total: totalTasks,
                    important: importantTasks,
                    completed: completedTasks,
                    pending: pendingTasks,
                });
                setTaskCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleSaveNote = async() => {
        if (notes.trim()) {
            try {
                const response = await axios.post(
                    "http://localhost:5005/api/notes/add-note",
                    { text: notes },
                    { headers }
                );

                if (response.status === 201) {
                    setStoredNotes([...storedNotes, response.data.data]);
                    setNotes("");
                }
            } catch (error) {
                console.error("Error saving note:", error);
            }
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
                        {activeTab === "alltasks" && <AllTasks />}
                        {activeTab === "completedTasks" && <CompletedTasks />}
                        {activeTab === "importantTasks" && <ImportantTasks />}
                        {activeTab === "incompleteTasks" && <InCompletedTasks />}
                        {activeTab === "notes" && (
                            <Notes
                                storedNotes={storedNotes}
                                setStoredNotes={setStoredNotes}
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
    