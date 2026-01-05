import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()
  const { token, loading } = useSelector(state => state.auth)

  const getUserData = async () => {
    const storedToken = localStorage.getItem('token')
    try {
      if (storedToken) {
        const { data } = await api.get('/api/users/data', { headers: { Authorization: storedToken } })
        if (data.user) {
          dispatch(login({ token: storedToken, user: data.user }))
        }
      }
    } catch (error) {
      console.error("Session expired or invalid")
      localStorage.removeItem('token')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (loading) return null; // Or a spinner

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!token ? <Login /> : <Navigate to="/app" />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />

        {/* Fallback */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App