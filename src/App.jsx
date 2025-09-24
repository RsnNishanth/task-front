
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'

import NavBar from './components/NavBar'
import Bg from './components/Bg'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
function App() {
  

  return (
    <>
    <NavBar />
      <Bg />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
