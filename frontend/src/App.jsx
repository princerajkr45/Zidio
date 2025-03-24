import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AllTasks from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import IncompletedTasks from './pages/ImportantTasks'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import InCompletedTasks from './pages/IncompletedTasks'

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
      <div className="bg-gray-900  text-white">

        <Routes>
          {/* <Route expct path="/" element={<Signup />}>
              <Route index element={<AllTasks />} />
              <Route path='/importantTasks' element={<ImportantTasks />} />
              <Route path='/completedTasks' element={<CompletedTasks />} />
              <Route path='/incompletedTasks' element={<IncompletedTasks />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route> */}
          <Route exact path="/dashboard" element={<Dashboard />}>
            <Route index element={<AllTasks />} />
            <Route path='/dashboard/importantTasks' element={<ImportantTasks />} />
            <Route path='/dashboard/completedTasks' element={<CompletedTasks />} />
            <Route path='/dashboard/incompletedTasks' element={<InCompletedTasks />} />
            
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </>
  )
}

export default App
