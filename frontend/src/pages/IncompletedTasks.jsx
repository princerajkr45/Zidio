import React, { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import axios from 'axios'

function InCompletedTasks() {

  const [Data, setData] = useState('')

  const headers = {
    id: localStorage.getItem('userId'),
    authorization: localStorage.getItem('authToken')
  }

  const fetchTaskDetails = async () => {
    const tasks = await axios.get("http://localhost:5005/api/tasks/get-incomplete-tasks/",
      { headers }
    )
    setData(tasks.data.data)
  }

  useEffect(() => {
    fetchTaskDetails()
  })


  return (
    <div>
      <Cards addTask={"false"} data={Data} />
    </div>
  )
}

export default InCompletedTasks