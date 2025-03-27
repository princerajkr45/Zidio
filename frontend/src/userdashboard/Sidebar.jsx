import { Link } from "react-router-dom";
import React, { useState } from "react";
import { CgNotes } from 'react-icons/cg';
import { MdLabel } from "react-icons/md";
import { FaCheckDouble } from 'react-icons/fa';
import { TbNotebookOff } from 'react-icons/tb';
import { FaTachometerAlt } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";


const Sidebar = ({ setActiveTab, activeTab }) => {

    const [showTaskSubTabs, setShowTaskSubTabs] = useState(false);

    const toggleTaskSubTabs = () => {
        console.log(showTaskSubTabs)
        setShowTaskSubTabs((prevState) => !prevState);
    };

    return (
        <div className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <ul className="space-y-4">
                <li>
                    <button
                        onClick={() => setActiveTab("home")}
                        className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-700"
                    >
                        <FaTachometerAlt />
                        Home
                    </button>
                </li>
                <li>
                    <button
                        onClick={toggleTaskSubTabs}
                        className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-700"
                    >
                        <FaListCheck />
                        Tasks
                    </button>
                    {showTaskSubTabs  && (
                        <ul className="ml-4 mt-2 space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveTab("allTasks")}
                                    className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-gray-700"
                                >
                                    <CgNotes />
                                    All Tasks
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab("completedTasks")}
                                    className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-700"
                                >
                                    <FaCheckDouble />
                                    Completed Tasks
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab("importantTasks")}
                                    className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-700"
                                >   
                                    <TbNotebookOff className="text-xl"/>
                                    Incomplete Tasks
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab("importantTasks")}
                                    className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-700"
                                >  
                                    <MdLabel className="text-xl"/>
                                    Important Tasks
                                </button>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link to={"/user-dashboard/notes"}
                        onClick={() => setActiveTab("notes")}
                        className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-700"
                    >
                        <FaNoteSticky />
                        Notes
                    </Link>
                </li>   
                <li>
                    <Link to={""}
                        onClick={() => setActiveTab("setting")}
                        className="flex items-center gap-1 w-full text-left p-2 rounded hover:bg-gray-700"
                    >
                        <IoSettingsSharp />
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
