import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import InputData from '../components/InputData'
import axios from 'axios';


function AllTasks() {

  const [inputDiv, setInputDiv] = useState("hidden");

  const [Data, setData] = useState('')

  const headers = {
    id: localStorage.getItem('userId'),
    authorization: localStorage.getItem('authToken')
  }

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const tasks = await axios.get("http://localhost:5005/api/tasks/get-all-tasks", {
        headers
      })
      // setName(tasks.data.data.name);
      // setEmail(tasks.data.data.email);
      setData(tasks.data.data)
    }
    fetchTaskDetails()
  }, [])
//  console.log(Data.tasks)

  return (
    <>
      <Cards addTask={"true"} setInputDiv={setInputDiv} data={Data.tasks} />
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  )
}

export default AllTasks