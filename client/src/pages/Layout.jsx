import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Login from './Login'
import Footer from '../components/home/Footer'

const Layout = () => {


  return (
    <div>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <Outlet />
        <Footer/>
      </div>


    </div>
  )
}

export default Layout
