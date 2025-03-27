import React from 'react'

function DashboardNavbar({name}) {
    return (
        <>
            {/* <div className="flex-1 p-2 overflow-y-auto"> 
                <div className="flex flex-col justify-end items-end bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
                    <div className="">
                        <img
                            src="https://source.unsplash.com/150x150/?portrait?3"
                            alt="Profile Picture"
                            className="w-12 h-12 rounded-full dark:bg-gray-500 aspect-square"
                        />
                    </div>
                    <div className="text-center space-y-1">
                        <h2 className="text-lg font-semibold sm:text-xl">Leroy Jenkins</h2>
                    </div>
                </div>
            </div> */}

            <div className="bg-white shadow-lg rounded-lg  flex flex-col items-end justify-center p-3">
                {/* Profile Image */}
                <div>
                    <img
                        src="https://source.unsplash.com/150x150/?portrait?3"
                        alt="Profile"
                        className="w-12 h-12 rounded-full dark:bg-gray-500"
                    />
                </div>

                {/* User Name */}
                <div className="">
                    <h2 className="text-lg font-semibold sm:text-xl uppercase">{name}</h2>
                </div>
            </div>
        </>
    )
}

export default DashboardNavbar
















