import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

import './styles/App.css';
import AddressForm from './components/AddressForm';

const App = () => {
  
  return (
	  <Router>
		  <Routes>
			  <Route path='/' element={<AuthPage />} />
			  <Route path='/login' element={<AuthPage />} />
			  <Route path='/changeAddress' element={<AddressForm />} />
			  <Route path='/dashboard' element={<Dashboard />} />
			  <Route path='/adminpanel' element={<AdminPanel />} />
		  </Routes>
	  </Router>
  )
};

export default App
