import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Log from './Log'
import Body from '../components/Body'

export default function Home() {
  return (
    <div>
      <div><Navbar></Navbar></div>
      <div><Body></Body></div>
      {/* <div><Footer></Footer></div>
      <div><Log></Log></div> */}
    </div>
  )
}
