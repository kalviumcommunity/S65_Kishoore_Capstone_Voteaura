import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import Login from './Admin/Login'

const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
            </Routes>

        </BrowserRouter>
    )
}
export default App
