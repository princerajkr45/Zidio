import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

function Cards({ addTask, setInputDiv , data }) {
   
    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {data && data.map((items, i) => (
                <div className='flex flex-col justify-between bg-gray-800 p-4 rounded-md'>
                    <div key={i} >
                        <h3 className='text-2xl'>{items.title}</h3>
                        <p className='text-gray-400 my-2'>{items.description}</p>
                    </div>
                    <div className="mt-2 w-full flex">
                        <button className={`${items.complete === false ? "bg-red-500" : "bg-green-800"} px-3 py-2 rounded w-3/6`}>
                        {items.complete ? "Completed" : "In Complete"}
                        </button>
                        <div className='text-white text-2xl p-2 w-3/6  bg-gray-800 flex justify-around items-center'>
                            <button>
                                <CiHeart />
                            </button>
                            <button className=''>
                                <FaEdit />
                            </button>
                            <button>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))
            }

            {addTask === "true" && (
                <button className='flex flex-col justify-center items-center bg-gray-800 p-4 rounded-md text-gray-300' onClick={()=>setInputDiv("fixed")}>
                    <IoIosAddCircle className='text-5xl' />
                    <h2 className='text-2xl my-2'>Add Task</h2>
                </button>
            )}
            
            
        </div>
        
    )
}

export default Cards