import React, { useState } from 'react';
import SignIn from './auth/Sign_In';
import SignUp from './auth/Sign_up';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Routes>
        <Route path='/' element={<Navigate to='/sign-up' />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;