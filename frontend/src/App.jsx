import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route , Routes , BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AllTasks  from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/ImportantTasks'
import Signup from './pages/SignUp'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gray-900 h-full text-white p-2 relative">
        <Router>
          <Routes>
            {/* <Route expct path="/" element={<Signup />}>
              <Route index element={<AllTasks />} />
              <Route path='/importantTasks' element={<ImportantTasks />} />
              <Route path='/completedTasks' element={<CompletedTasks />} />
              <Route path='/incompletedTasks' element={<IncompletedTasks />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route> */}
            <Route exact path="/" element={<Dashboard />}>
              <Route index element={<AllTasks />} />
              <Route path='/importantTasks' element={<ImportantTasks />} />
              <Route path='/completedTasks' element={<CompletedTasks />} />
              <Route path='/incompletedTasks' element={<IncompletedTasks />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
