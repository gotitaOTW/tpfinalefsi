import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './pages/Layout.jsx'
import './App.css'
import  Register  from './pages/Register.jsx';
import  Login  from './pages/Login.jsx';
import Perfil from './pages/Perfil.jsx';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
