import React, { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import axios from 'axios'

function InCompletedTasks() {

  const [Data, setData] = useState('');
  const [viewMode, setViewMode] = useState('card');

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
      <div className="flex justify-end p-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
        >
          Toggle View
        </button>
      </div>
      <Cards addTask={"false"} data={Data} viewMode={viewMode} />
    </div>
  )
}

export default InCompletedTasks