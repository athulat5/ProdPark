// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Home2 from './components/pages/Home2';
import About from './components/pages/About';
 // Import the Layout component

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/about" element={<About />} />
        </Routes>
      
    </Router>
  );
}

export default App;
