import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import api from './configs/api';
import { login, setLoading } from './app/features/authSlice';

import Home from './pages/Home';
import Layout from './pages/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const Preview = lazy(() => import('./pages/Preview'));
const Login = lazy(() => import('./pages/Login'));

const PageLoader = () => (
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <p>Loading...</p>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector(state => state.auth);

  const getUserData = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const { data } = await api.get('/api/users/data', {
        headers: { Authorization: storedToken }
      });
      if (data.user) {
        dispatch(login({ token: storedToken, user: data.user }));
      }
    } catch (error) {
      console.error("Session expired");
      localStorage.removeItem('token');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!token ? <Login /> : <Navigate to="/app" />} />

          <Route path='app' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='builder/:resumeId' element={<ResumeBuilder />} />
          </Route>

          <Route path='view/:resumeId' element={<Preview />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;