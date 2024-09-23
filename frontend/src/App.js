import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Home2 from './components/pages/Home2';
import About from './components/pages/About';

import LoginPage from './components/pages/Login';
import AdminDashboard from './components/pages/Admindashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<LoginPage />} />    
        <Route path="/Admindashboard" element={<AdminDashboard />} />  

      </Routes>
    </Router>
  );
}

export default App;
