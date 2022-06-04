import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LineupForm from '../Components/LineupForm';
import Home from '../Views/Home';
import Lineups from '../Views/Lineups';
import Login from '../Views/Login';
import Register from '../Views/Register';

export default function PublicRoutes({ isLoggedIn }){
    return(
      <>
        <Routes>
          <Route exact path="/" element={ isLoggedIn ? <Home /> : <Login />} />
          <Route exact path="/login" element={ isLoggedIn ? <Home /> : <Login /> } />
          <Route exact path="/lineups" element={ <Lineups /> } />
          <Route exact path="/lineup-form" element={ <LineupForm /> } />
          <Route exact path="/register" element={ <Register/> } />
          <Route exact path="/logout" element={isLoggedIn ? <Home/> : <Register/>} />
        </Routes>
      </>
    )
}