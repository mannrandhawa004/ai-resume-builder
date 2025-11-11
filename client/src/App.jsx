import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import ResumeBuilder from './pages/ResumeBuilder'

const App = () => {
  return (
    <>

      <Toaster />
      <Routes>
        {/* Public route */}
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Login />} />

        {/* Protected routes */}
        <Route path='/dashboard' element={<Layout />}>
          {/* Index route inside Layout */}
          <Route index element={<Dashboard />} />

          {/* Add more nested routes here if needed */}
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
          <Route path='builder' element={<ResumeBuilder />} />
      </Routes>
    </>
  )
}

export default App
