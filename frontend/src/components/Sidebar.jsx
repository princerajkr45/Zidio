import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import axios from 'axios';


function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const [Data, setData] = useState('')

    const headers = {
        id: localStorage.getItem('userId'),
        authorization: localStorage.getItem('authToken')
    }

    useEffect(() => {
        const fetchTaskDetails = async() => {
         const tasks = await axios.get("http://localhost:5005/api/tasks/get-all-tasks",{
                headers
            })
            // setName(tasks.data.data.name);
            // setEmail(tasks.data.data.email);
            setData(tasks.data.data)
        }
        fetchTaskDetails()
    }, [])
    

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("userId");
        localStorage.clear("authToken");
        navigate('/login');
    }

    const data = [
        {
            title: 'All Tasks',
            icon: <CgNotes />,
            link: '/dashboard',
        },
        {
            title: 'Important Tasks',
            icon: <MdLabelImportant />,
            link: '/dashboard/importantTasks',
        },
        {
            title: 'Completed Tasks',
            icon: <FaCheckDouble />,
            link: '/dashboard/completedTasks',
        },
        {
            title: 'Incompleted Tasks',
            icon: <TbNotebookOff />,
            link: '/dashboard/incompletedtasks',

        },
    ]
    return (
        <>
           <div>
                <div className='text-center '>
                    <h2 className='text-2xl uppercase pb-2'>{Data.name}</h2>
                    <h4 className='pb-2'>{Data.email}</h4>
                    <hr />
                </div>
                <div className='pt-4'>

                    {data.map((items, i) => (
                        <Link
                            to={items.link}
                            key={i}
                            className='my-2 flex items-center gap-2 p-2 hover:bg-gray-500 transition-all duration-300 rounded-sm'>
                            {items.icon}{items.title}
                        </Link>
                    ))}
                </div>
           </div>
            <div>
                <button className='w-full p-2 bg-gray-600 rounded hover:bg-gray-400 transition-all duration-300 cursor-pointer' onClick={logout}>Log out</button>
            </div>
        </>
    )
}

export default Sidebar