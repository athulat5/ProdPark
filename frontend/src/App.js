import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Home2 from './components/pages/Home2';
import About from './components/pages/About';

import LoginPage from './components/pages/Login';
import AdminDashboard from './components/pages/Admindashboard';
import ClientRegistration from './components/pages/Client/ClientReg';
import IndustryRegistration from './components/pages/Industry/IndustryRegistration';
import StaffRegistration from './components/pages/Staff/Staffreg';
import StaffDashboard from './components/pages/Staff/StaffDashboard';
import StaffManagement from './components/pages/Staff/StaffManagement';
import IndustryApproval from './components/pages/Industry/IndustryApproval';
import IndustryDashboard from './components/pages/Industry/IndustryDashboard';
import ClientDashboard from './components/pages/Client/ClientDashboard';
import IndustryList from './components/pages/Industry/IndustryList';
import ClientApprove from './components/pages/Client/ClientApprove';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<LoginPage />} />    
        <Route path="/Admindashboard" element={<AdminDashboard />} />  
        <Route path="/clientReg" element={<ClientRegistration />} />
        <Route path="/IndustryRegistration" element={<IndustryRegistration />} />
        <Route path="/Staffreg" element={<StaffRegistration />} />
        <Route path="/StaffDashboard" element={<StaffDashboard />} />
        <Route path="/StaffManagement" element={<StaffManagement />} />
        <Route path="/IndustryApproval" element={<IndustryApproval />} />
        <Route path="/IndustryDashboard" element={<IndustryDashboard />} />
        <Route path="/ClientDashboard" element={<ClientDashboard />} />
        <Route path="/IndustryList" element={<IndustryList />} />
        <Route path="/ClientApprove" element={<ClientApprove />} />

      </Routes>
    </Router>
  );
}

export default App;
