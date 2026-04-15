import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import LandingPage from './Landing/Landing'
import Signup from './User/Signup'
import Info from './Navbar/Info'
import LandingNavbar from './Navbar/AdminNavbar'
import Candidatereg from './Candidate/Candidatereg'
import Display from './DisplayData/UserDetails'
import Query from './Query/Query'
import Login from './Login/Login'
import GetQuery from './DisplayData/QueryData'
import Candidate from './Candidate/CandidateDis'
import AdminLogin from './Login/AdminLogin'
const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/info' element={<Info/>}/>
                <Route path='/admin' element={<LandingNavbar/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/candidate' element={<Candidatereg/>}/>
                <Route path='/user' element={<Display/>}/>
                <Route path='/query' element={<Query/>}/>
                <Route path='/getquery' element={<GetQuery/>}/>
                <Route path='/candidatedis' element={<Candidate/>}/>
                <Route path='/admin-login' element={<AdminLogin/>}/>

            </Routes>

        </BrowserRouter>
    )
}
export default App
