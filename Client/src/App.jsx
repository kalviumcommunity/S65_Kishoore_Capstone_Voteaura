import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import LandingPage from './Landing/Landing'
import Signup from './User/Signup'
import Info from './Navbar/Info'
import LandingNavbar from './Navbar/AdminNavbar'

import Login from './Login/Login'

const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/info' element={<Info/>}/>
                <Route path='/admin' element={<LandingNavbar/>}/>
                <Route path='/login' element={<Login/>}/>

            </Routes>

        </BrowserRouter>
    )
}
export default App
