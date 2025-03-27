// src/components/HomeTab.js
import React from "react";

const Home = ({ tasks, taskCategories, notes, setNotes, handleSaveNote }) => {
    return (
        <>
            {/* Task Overview */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Task Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(tasks).map(([key, value]) => (
                        <div key={key} className="rounded-lg p-4 text-center shadow-md">
                            <h2 className="text-lg font-semibold capitalize">{key.replace("tasks", " Tasks")}</h2>
                            <span className="inline-block px-3 py-1 rounded-lg text-xl font-bold mt-2">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Task Categories */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Task Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-lg">
                    {taskCategories.map((task) => (
                        <div key={task.category} className="rounded-lg p-4 text-center shadow-md">
                            <h2 className="text-md font-medium">{task.category}</h2>
                            <span className="inline-block px-3 py-1 rounded-lg text-xl font-bold mt-1">{task.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write Note Section */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Write a Note</h2>
                <textarea
                    className="w-full p-2 outline-none bg-gray-200 rounded-lg"
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your note here..."
                ></textarea>
                <button
                    className="mt-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSaveNote}
                >
                    Save Note
                </button>
            </div>
            
        </>
    );
};

export default Home;
