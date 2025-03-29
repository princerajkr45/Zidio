import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import InputData from '../components/InputData'
import axios from 'axios';


function AllTasks() {

  const [inputDiv, setInputDiv] = useState("hidden");
  const [updateTask, setUpdateTask] = useState(false);
  const [updatedData, setUpdatedData] = useState({ id: "", title: "", description: "" });
  const [viewMode, setViewMode] = useState('card');

  const [Data, setData] = useState('')

  const headers = {
    id: localStorage.getItem('userId'),
    authorization: localStorage.getItem('authToken')
  }

  const fetchTaskDetails = async () => {
    const tasks = await axios.get("http://localhost:5005/api/tasks/get-all-tasks", {
      headers
    })
    // setName(tasks.data.data.name);
    // setEmail(tasks.data.data.email);
    setData(tasks.data.data)
  }

  useEffect(() => {
    fetchTaskDetails()
  }, [updateTask])
  //  console.log(Data.tasks)

  return (
    <>

      <div className="flex justify-end p-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
        >
          Toggle View
        </button>
      </div>
      {/* <Cards addTask={"false"} data={Data} viewMode={viewMode} /> */}
      <Cards
        addTask={"true"}
        setInputDiv={setInputDiv}
        data={Data.tasks}
        setUpdateTask={setUpdateTask}
        setUpdatedData={setUpdatedData}
        viewMode={viewMode}
      />
      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        setUpdateTask={setUpdateTask}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  )
}

export default AllTasks