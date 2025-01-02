import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

import './styles/App.css';

const App = () => {
  
  return (
	  <Router>
		  <Routes>
			  <Route path='/' element={<AuthPage />} />
			  <Route path='/login' element={<AuthPage />} />
			  <Route path='/dashboard' element={<Dashboard />} />
			  <Route path='/adminpanel' element={<AdminPanel />} />
		  </Routes>
	  </Router>
  )
};

export default App
