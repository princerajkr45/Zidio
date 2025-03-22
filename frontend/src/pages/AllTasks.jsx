import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import InputData from '../components/InputData'
import axios from 'axios';


function AllTasks() {

  const [inputDiv, setInputDiv] = useState("hidden");
  const [updateTask, setUpdateTask] = useState(false);
  const [updatedData, setUpdatedData] = useState({ id: "", title: "", description: "" })

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
      <Cards
        addTask={"true"}
        setInputDiv={setInputDiv}
        data={Data.tasks}
        setUpdateTask={setUpdateTask}
        setUpdatedData={setUpdatedData}
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