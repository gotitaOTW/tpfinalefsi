import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout.jsx'
import './App.css'
import  Register  from './pages/Register.jsx';
import  Login  from './pages/Login.jsx';
import Perfil from './pages/Perfil.jsx';
import Events from './pages/Events.jsx';
import DetailEvent from './pages/DetailEvent.jsx';
import EditEvent from './pages/EditEvent.jsx';
import CreateEvent from './pages/CreateEvent.jsx'





function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/events' element={<Events />}></Route>
        <Route path='/event' element={<DetailEvent />}></Route>
        <Route path='/edit-event' element={<EditEvent />}></Route>
        <Route path='/create-event' element={<Create />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
