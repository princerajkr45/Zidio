
import React from "react";
import { CgNotes } from 'react-icons/cg';
import { MdLabelImportant } from 'react-icons/md';
import { FaCheckDouble } from 'react-icons/fa';
import { TbNotebookOff } from 'react-icons/tb';

const Task = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Task Categories</h2>
            <ul className="ml-4 space-y-2">
                <li>
                    <Link href="/taskdashboard" className="block p-2 rounded hover:bg-gray-700">
                        <CgNotes className="inline mr-2" />
                        All Tasks
                    </Link>
                </li>
                <li>
                    <Link href="/taskdashboard/importantTasks" className="block p-2 rounded hover:bg-gray-700">
                        <MdLabelImportant className="inline mr-2" />
                        Important Tasks
                    </Link>
                </li>
                <li>
                    <Link href="/taskdashboard/completedTasks" className="block p-2 rounded hover:bg-gray-700">
                        <FaCheckDouble className="inline mr-2" />
                        Completed Tasks
                    </Link>
                </li>
                <li>
                    <Link href="/taskdashboard/inCompletedtasks" className="block p-2 rounded hover:bg-gray-700">
                        <TbNotebookOff className="inline mr-2" />
                        Incompleted Tasks
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Task;
