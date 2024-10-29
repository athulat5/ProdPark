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
import ComplaintForm from './components/pages/Industry/ComplaintForm';
import AdminFeedback from './components/pages/AdminFeedback';
import ViewAllCompanies from './components/pages/Industry/ViewAllCompanies';
import BuyProduct from './components/pages/Client/BuyProduct';
import AddProduct from './components/pages/Client/AddProduct';
import PaymentPage from './components/pages/Client/PaymentPage';
import PaymentSuccess from './components/pages/Client/Thank';
import CheckApprovalStatus from './components/pages/Industry/CheckApprovalStatus';
import AuthProvider from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<LoginPage />} />

        {/* <Route path="/Admindashboard" element={<AdminDashboard />} />   */}
        <Route path="/Admindashboard" element={<ProtectedRoute />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>

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
        <Route path="/ComplaintForm" element={<ComplaintForm />} />
        <Route path="/AdminFeedback" element={<AdminFeedback />} />
        <Route path="/ViewAllCompanies" element={<ViewAllCompanies />} />
        <Route path="/BuyProduct" element={<BuyProduct />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/payment/:productId" element={<PaymentPage />} />
        <Route path="/buy" element={<BuyProduct />} />
        <Route path="/thank" element={<PaymentSuccess />} />
        <Route path="/CheckApprovalStatus" element={<CheckApprovalStatus />} />

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
