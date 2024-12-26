import './styles/App.css';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  
  return (
	  <Router>
		  <Routes>
			  <Route path='/' element={<AuthPage />} />
			  <Route path='/home' element={<Dashboard />} />
		  </Routes>
	  </Router>
  )
};

export default App
