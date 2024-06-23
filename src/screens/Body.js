import React, { useState, useEffect } from 'react';

import Carausel from '../components/Carausel';
import About from '../components/About';
import Team from '../components/Team';
import Products from '../components/Products';
export default function Body() {
    return (
        <div>
            <div><Carausel></Carausel></div>
            <div><About></About></div>
            <div><Products></Products></div>
            <div><Team></Team></div>
        </div>
    )
}
