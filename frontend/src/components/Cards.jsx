import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

function Cards({ addTask, setInputDiv, data, setUpdateTask, setUpdatedData, viewMode }) {

    const headers = {
        id: localStorage.getItem('userId'),
        authorization: localStorage.getItem('authToken')
    }

    const completeStatus = async (id) => {
        try {
            const status = await axios.put(`http://localhost:5005/api/tasks/update-complete-task/${id}`,
                {},
                { headers }
            )
            setUpdateTask(prev => !prev);
        } catch (error) {
            console.error(error)
        }
    }

    const impStatus = async (id) => {
        try {
            const status = await axios.put(`http://localhost:5005/api/tasks/update-imp-task/${id}`,
                {},
                { headers }
            )
            setUpdateTask(prev => !prev);
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const status = await axios.delete(`http://localhost:5005/api/tasks/delete-task/${id}`,
                { headers }
            )
            setUpdateTask(prev => !prev);
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdate = (id, title, description) => {
        setInputDiv("fixed")
        setUpdatedData({ id: id, title: title, description: description })
    }

    return (
        // <div className="grid grid-cols-3 gap-4 p-4">
        //     {data &&
        //         data.map((items, i) => (
        //             <div className="flex flex-col justify-between bg-gray-800 p-4  rounded-md">
        //                 <div key={i}>
        //                     {/* Category Badge */}
        //                     <span
        //                         className={`px-2 py-1 text-xs font-semibold rounded-full ${items.category === "work"
        //                                 ? "bg-blue-500 text-white"
        //                                 : items.category === "personal"
        //                                     ? "bg-green-500 text-white"
        //                                     : "bg-orange-500 text-white"
        //                             }`}
        //                     >
        //                         {items.category}
        //                     </span>

        //                     <h3 className="text-2xl text-white mt-2">{items.title}</h3>
        //                     <p className="text-gray-400 my-2">{items.description}</p>


        //                 </div>

        //                 <div className="mt-2 w-full flex">
        //                     <button
        //                         className={`${items.complete === false ? "bg-red-500" : "bg-green-800"
        //                             } px-3 py-2 rounded w-3/6`}
        //                         onClick={() => completeStatus(items._id)}
        //                     >
        //                         {items.complete == true ? "Completed" : "In Complete"}
        //                     </button>

        //                     <div className="text-white text-2xl p-2 w-3/6 bg-gray-800 flex justify-around items-center">
        //                         <button onClick={() => impStatus(items._id)}>
        //                             {items.important == true ? (
        //                                 <FaHeart className="text-red-500" />
        //                             ) : (
        //                                 <CiHeart />
        //                             )}
        //                         </button>

        //                         {addTask !== "false" && (
        //                             <button
        //                                 onClick={() =>
        //                                     handleUpdate(items._id, items.title, items.description)
        //                                 }
        //                             >
        //                                 <FaEdit />
        //                             </button>
        //                         )}

        //                         <button onClick={() => deleteTask(items._id)}>
        //                             <MdDelete />
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}

        //     {addTask === "true" && (
        //         <button
        //             className="flex flex-col justify-center items-center bg-gray-800 p-4 rounded-md text-gray-300"
        //             onClick={() => setInputDiv("fixed")}
        //         >
        //             <IoIosAddCircle className="text-5xl" />
        //             <h2 className="text-2xl my-2">Add Task</h2>
        //         </button>
        //     )}
        // </div>
        <div>
            {viewMode === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 ">
                    {data && data.map((task) => (
                        <div key={task.id} className="flex flex-col justify-between bg-gray-800 text-white shadow-md rounded-md p-4">
                            <span
                                className={`w-1/5 px-2 py-1 text-center text-xs font-semibold rounded-full ${task.category === "work"
                                    ? "bg-blue-500 text-white"
                                    : task.category === "personal"
                                        ? "bg-green-500 text-white"
                                        : task.category === "urgent"
                                            ? "bg-red-500 text-white"
                                            : "bg-yellow-500 text-white"
                                    }`}
                            >
                                {task.category}
                            </span>
                            <h3 className="text-lg font-bold">{task.title}</h3>
                            <p className="text-gray-400">{task.description}</p>
                            {/* <p className="text-sm font-semibold">Status: {task.complete ? "Completed" : "In Complete"}</p> */}

                            <div className='mt-2 w-full flex'>
                                <button
                                    className={`${task.complete === false ? "bg-red-500" : "bg-green-800"
                                        } px-3 py-2 rounded w-3/6`}
                                    onClick={() => completeStatus(task._id)}
                                >
                                    {task.complete == true ? "Completed" : "In Complete"}
                                </button>

                                <div className="text-white text-2xl p-2 w-3/6 bg-gray-800 flex justify-around items-center">

                                    <button onClick={() => impStatus(task._id)}>
                                        {task.important ? <FaHeart className="text-red-500" /> : <CiHeart />}
                                    </button>

                                    {addTask !== "false" && (
                                        <button
                                            onClick={() =>
                                                handleUpdate(task._id, task.title, task.description)
                                            }
                                        >
                                            <FaEdit className='text-blue-700' />
                                        </button>
                                    )}
                                    <button onClick={() => deleteTask(task._id)}>
                                        <MdDelete className='text-red-700' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {addTask === "true" && (
                        <button
                            className="flex flex-col justify-center items-center bg-gray-800 p-4 rounded-md text-gray-300"
                            onClick={() => setInputDiv("fixed")}
                        >
                            <IoIosAddCircle className="text-5xl" />
                            <h2 className="text-2xl my-2">Add Task</h2>
                        </button>
                    )}
                </div>
            ) : (
                <table className="min-w-full bg-white  rounded">
                    <thead className='px-4 py-4 dark:bg-gray-100 outline-none'>
                        <tr>
                            <th className="px-4 py-4 text-left">S.No.</th>
                            <th className="px-4 py-4 text-left">Title</th>
                            <th className="px-4 py-4 text-left">Description</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Important</th>
                            <th className="px-4 py-4">Category</th>
                            <th className="px-4 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((task, index) => (
                                <tr key={task.id} className="border-b border-opacity-20 dark:border-gray-300 capitalize">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{task.title}</td>
                                    <td className="px-4 py-2">{task.description}</td>
                                    <td className="px-4 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded hover:cursor-pointer text-white text-xs font-semibold ${task.complete ? "bg-green-500" : "bg-red-500"
                                                }`}
                                            onClick={() => completeStatus(task._id)}
                                        >
                                            {task.complete ? "Completed" : "Incomplete"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button onClick={() => impStatus(task._id)}>
                                            {task.important ? <FaHeart className="text-red-500" /> : <CiHeart />}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded hover:cursor-pointer text-white text-xs font-semibold ${task.category === "work"
                                                ? "bg-blue-500"
                                                : task.category === "personal"
                                                    ? "bg-green-500"
                                                    : task.category === "urgent"
                                                        ? "bg-red-500"
                                                        : "bg-yellow-500"
                                                }`}
                                        >
                                            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 flex items-center justify-center space-x-2">
                                        {addTask !== "false" && (
                                            <button
                                                onClick={() =>
                                                    handleUpdate(task._id, task.title, task.description)
                                                }
                                            >
                                                <FaEdit className='text-blue-700' />
                                            </button>
                                        )}
                                        <button onClick={() => deleteTask(task._id)}>
                                            <MdDelete className="text-red-500  hover:cursor-pointer" />
                                        </button>
                                    </td>
                                    
                                </tr>
                            ))}
                           
                    </tbody>
                </table>

            )}
        </div>

    )
}

export default Cards