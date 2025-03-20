import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

function InputData({ inputDiv, setInputDiv }) {

    
    return (
        <>
            <div className={`${inputDiv}  top-0 left-0 bg-gray-800 opacity-80 h-full w-full`}></div>
            <div className={` ${inputDiv}  top-0 left-0 flex justify-center items-center h-full w-full `}>
                <div className='w-2/7 bg-gray-900 p-4 rounded relative'>
                <div className='flex justify-end text-2xl text-gray-300 pb-3'>
                    <IoCloseOutline onClick={()=>setInputDiv("hidden")}/>
                </div>
                    <input type="text" placeholder='Title' name='title' className='px-3 py-2 rounded w-full' />
                    <textarea name="desc" placeholder='Description' cols="30" rows="10" className='px-3 py-2 rounded w-full'></textarea>
                    <button className='bg-green-800 px-3 py-2 rounded w-full'>Add Task</button>
                </div>
                
            </div>

        </>
    )
}

export default InputData