import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import TaskDashboard from './components/TaskDashboard'
import AllTasks from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/ImportantTasks'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import InCompletedTasks from './pages/IncompletedTasks'
import UserDashboard from './userdashboard/UserDashboard'
import Notes from './userdashboard/Notes'
import Home from './userdashboard/Home'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("authToken")){
      dispatch(authActions.login())
    } else if (isLoggedIn === false) {
      navigate("/login");
    }

  }, [])



  return (
    <>
      <div className="">

        <Routes>
          {/* <Route expct path="/" element={<Signup />}>
              <Route index element={<AllTasks />} />
              <Route path='/importantTasks' element={<ImportantTasks />} />
              <Route path='/completedTasks' element={<CompletedTasks />} />
              <Route path='/incompletedTasks' element={<IncompletedTasks />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route> */}
          <Route exact path="/taskdashboard" element={<TaskDashboard />}>
            <Route index element={<AllTasks />} />
            <Route path='/taskdashboard/importantTasks' element={<ImportantTasks />} />
            <Route path='/taskdashboard/completedTasks' element={<CompletedTasks />} />
            <Route path='/taskdashboard/incompletedTasks' element={<InCompletedTasks />} />
            
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/user-dashboard' element={<UserDashboard />}>
            <Route index element={<Home />} />
            <Route path='/user-dashboard/notes' element={<Notes />} />

          </Route>
        </Routes>

      </div>
    </>
  )
}

export default App
