import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

function InputData({ inputDiv, setInputDiv, setUpdateTask, updatedData, setUpdatedData }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const validateInput = () => {
        const error = {};
        if (!title) {
            error.title = 'Title is required';
        }
        if (!description) {
            error.description = 'Description is required';
        }
        setErrors(error);
        return Object.keys(error).length === 0;
    };

    const headers = {
        id: localStorage.getItem('userId'),
        authorization: localStorage.getItem('authToken')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;

        try {
            await axios.post("http://localhost:5005/api/tasks/add-task",
                { title, description },
                { headers }
            )

            setUpdateTask(prev => !prev);

            setInputDiv("hidden");
            setTitle('');
            setDescription('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;

        try {
            await axios.put(`http://localhost:5005/api/tasks/update-task/${updatedData.id}`,
                { title, description },
                { headers }
            )

            setUpdateTask(prev => !prev);

            setInputDiv("hidden");
            setTitle('');
            setDescription('');
            setUpdatedData({id: "", title:"", description:""})
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setTitle(updatedData.title);
        setDescription(updatedData.description);
    }, [updatedData])

    return (
        <>
            <div className={`${inputDiv}  top-0 left-0 bg-gray-800 opacity-80 h-full w-full`}></div>
            <div className={` ${inputDiv}  top-0 left-0 flex justify-center items-center h-full w-full `}>
                <div className='w-2/7 bg-gray-900 p-4 rounded relative'>
                    <div className='flex justify-end text-2xl text-gray-300 pb-3'>
                        <IoCloseOutline
                            onClick={() => {
                                setInputDiv("hidden");
                                setTitle("");
                                setDescription("");
                                setUpdatedData({id: "",title:"", description:""})
                            }} />
                    </div>
                    <input
                        type="text"
                        placeholder='Title'
                        name='title'
                        className='px-3 py-2 mb-1 bg-gray-800 outline-none rounded w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        name="description"
                        placeholder='Description'
                        cols="30"
                        rows="10"
                        className='px-3 py-2 bg-gray-800 outline-none rounded w-full'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {updatedData.id === "" ? 
                        <button className='bg-green-800 px-3 py-2 rounded w-full' onClick={handleSubmit}>Add Task</button>

                        : <button className='bg-green-800 px-3 py-2 rounded w-full' onClick={handleUpdate}> Update Task</button>
                         }
                </div>

            </div>

        </>
    )
}

export default InputData