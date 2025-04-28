import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Login from './Admin/Login'
import LandingPage from './Landing/Landing'
import Signup from './User/Signup'
import Info from './Navbar/Info'

const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/info' element={<Info/>}/>

            </Routes>

        </BrowserRouter>
    )
}
export default App
