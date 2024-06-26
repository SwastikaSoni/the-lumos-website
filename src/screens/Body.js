import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel';
import About from '../components/About';
import Team from '../components/Team';
import Products from '../components/Products';
import Footer from '../components/Footer'
export default function Body() {
    return (
        <div>
            <div><Navbar></Navbar></div>
            <div><Carausel></Carausel></div>
            <div><About></About></div>
            <div><Products></Products></div>
            <div><Team></Team></div>
            <div><Footer></Footer></div>
        </div>
    )
}
