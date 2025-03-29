import React, { useState, useEffect, useRef } from 'react'
import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';

function DashboardNavbar() {

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("http://localhost:5005/images/default.png");
    const [showOptions, setShowOptions] = useState(false); // Toggle for upload option
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("userId");

                if (!userId) return;

                const response = await axios.get("http://localhost:5005/api/users/get-user", {
                    headers: { id: userId },
                });
                setUser(response.data.user);
                setImagePreview(`http://localhost:5005/images/${response.data.user.profile}`);

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));

        // Upload the file immediately after selection
        const formData = new FormData();
        formData.append("profile", selectedFile);
       

        try {
            const response = await axios.post("http://localhost:5005/api/users/upload-profile", formData, {
                headers: { "Content-Type": "multipart/form-data", "id": localStorage.getItem("userId"), },
            });

            console.log("Upload success:", response.data);
            setShowOptions(false); // Hide options after upload
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };



    return (
        <>
            <div className="bg-white shadow-lg rounded-lg flex flex-col items-end justify-center p-3 relative">
                {/* Profile Image */}
                <div className="relative">
                    <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-18 h-18 rounded-full dark:bg-gray-500"
                    />

                    {/* Edit Icon */}
                    <button
                        className="absolute bottom-0 right-1 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                        onClick={() => setShowOptions(!showOptions)} // Toggle upload menu
                    >
                        <FaUserEdit size={12} />
                    </button>

                    {/* Upload Option */}
                    {showOptions && (
                        <div className="absolute bottom-[-50px] right-[10px] bg-white shadow-md rounded-lg py-2 w-32 text-sm text-gray-800">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={() => fileInputRef.current.click()} // Trigger file input
                            >
                                Upload Profile
                            </button>
                        </div>
                    )}

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {/* <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                        Upload
                    </button> */}
                </div>

                {/* User Name */}
                <div>
                    <h2 className="text-lg font-semibold sm:text-xl uppercase">{user?.name}</h2>
                </div>
            </div>
        </>
    )
}

export default DashboardNavbar
















