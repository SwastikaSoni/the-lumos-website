import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pop from '../components/Pop'
export default function Home() {
  return (
    <div>
      <div><Navbar></Navbar></div>
      <div><Pop></Pop></div>
      <div><Footer></Footer></div>
    </div>
  )
}
