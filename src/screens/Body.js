import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import Carausel from '../components/Carausel';
import About from '../components/About';
import Team from '../components/Team';
import Products from '../components/Products';
import Footer from '../components/Footer'
export default function Body({ scrollToSection }) {
    useEffect(() => {
        if (scrollToSection === 'products') {
            document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
        }
    }, [scrollToSection]);
    return (
        <div>
            <div><Navbar></Navbar></div>
            <div><Carausel></Carausel></div>
            <div><About></About></div>
            <div id="products-section"><Products></Products></div>
            <div><Team></Team></div>
            <div><Footer></Footer></div>
        </div>
    )
}
