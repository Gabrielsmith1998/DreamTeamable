import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Views/Home';
import Login from '../Views/Login';

export default function PublicRoutes(){

    return(
        <>
        <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route exact path="/login" element={ <Login /> } />
        </Routes>
        </>
    )

}