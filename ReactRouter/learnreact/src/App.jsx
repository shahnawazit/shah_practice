import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './components/Pages/Login'
import Dashboard from './components/Pages/Dashboard'


function App() {
  const [count, setCount] = useState(0)
const location = useLocation();
  return (
    <>
  <div>
    
    {
            (location.pathname === "/") && <Routes>
              <Route path='/' exact element={<Login/>} />
            </Routes>
          }
 
          {
            (location.pathname !== "/") && <> <Navigation/> 
            <Routes>
              <Route path='/dashboard' exact element={<Dashboard/>} />
            </Routes>
            </>
          } 
      
  </div>
    </>
  )
}

export default App
