import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Bg from './components/Bg'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'       // ✅ correct case and path
// ✅ correct case and path
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

function App() {
  return (
    <>
      <NavBar />
      <Bg />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
