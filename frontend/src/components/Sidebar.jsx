import React from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';


function Sidebar() {

    const data = [
        {
            title: 'All Tasks',
            icon: <CgNotes />,
            link: '/',
        },
        {
            title: 'Important Tasks',
            icon: <MdLabelImportant />,
            link: '/importantTasks',
        },
        {
            title: 'Completed Tasks',
            icon: <FaCheckDouble />,
            link: '/completedTasks',
        },
        {
            title: 'Incompleted Tasks',
            icon: <TbNotebookOff />,
            link: '/incompletedtasks',

        },
    ]
    return (
        <>
            <div>
                <h2>Name</h2>
                <h4>abc@gmail.com</h4>
                <hr></hr>
            </div>
            <div>

                {data.map((items, i) => (
                    <Link
                        to={items.link}
                        key={i}
                        className='my-2 flex items-center gap-2 p-2 hover:bg-gray-500 transition-all duration-300 rounded-sm'>
                        {items.icon}{items.title}
                    </Link>
                ))}
            </div>
            <div>
                <button>Log out</button>
            </div>
        </>
    )
}

export default Sidebar