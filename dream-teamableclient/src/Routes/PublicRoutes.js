import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LineupForm from '../Components/LineupForm';
import Compare from '../Views/Compare';
import EditLineup from '../Views/EditLineup';
import Home from '../Views/Home';
import Lineups from '../Views/Lineups';
import Login from '../Views/Login';
import Profile from '../Views/Profile';
import Register from '../Views/Register';

export default function PublicRoutes({ isLoggedIn }){
    return(
      <>
        <Routes>
          <Route exact path="/" element={ isLoggedIn ? <Home /> : <Login />} />
          <Route exact path="/login" element={ isLoggedIn ? <Home /> : <Login /> } />
          <Route exact path="/profile/:firebaseUserId" element={ <Profile /> } />
          <Route exact path="/lineups" element={ <Lineups /> } />
          <Route exact path="/lineups-edit/:id" element={isLoggedIn ? <EditLineup/> : <Login/>} />
          <Route exact path="/compare" element={ <Compare /> } />
          <Route exact path="/lineup-form" element={ <LineupForm /> } />
          <Route exact path="/register" element={ <Register/> } />
          <Route exact path="/logout" element={isLoggedIn ? <Home/> : <Register/>} />
        </Routes>
      </>
    )
}