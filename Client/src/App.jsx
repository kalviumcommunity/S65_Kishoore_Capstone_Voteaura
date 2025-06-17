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
import View from './DisplayData/View'
import VoteLogin from './Login/VoteLogin'
import Start from './Candidate/Start'
import VeiwDetails from './DisplayData/StartDis'
import MessageDis from './DisplayData/MessageDis'
import Message from './Query/Message'

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
                <Route path='/view/:id' element={<View/>}/>
                <Route path='/votelogin' element={<VoteLogin/>}/>
                <Route path='/start' element={<Start/>}/>
                <Route path='/viewdetails' element={<VeiwDetails/>}/>
                <Route path='/message' element={<Message/>}/>
                <Route path='/messagedis' element={<MessageDis/>}/>




            </Routes>

        </BrowserRouter>
    )
}
export default App
