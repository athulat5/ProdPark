import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Home2 from './components/pages/Home2';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
    
       <Route path="/Home2" element={<Home2 />} />
      </Routes>
    </Router>
  );
}

export default App;
