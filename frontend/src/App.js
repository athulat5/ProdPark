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
import OrderList from './components/pages/Industry/OrderList';
import AddRawMaterial from './components/pages/Staff/AddRawMaterial';
import  EditOrder from './components/pages/Staff/EditOrder';
import  ListOrders from './components/pages/Staff/ListOrders';
import BuyRawMaterial from './components/pages/Industry/BuyRawMaterial';
import RPaymentPage from './components/pages/Industry/RPaymentPage';



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
        
        <Route path="/Staffreg" element={<ProtectedRoute />}>
          <Route path="" element={<StaffRegistration />} />
        </Route>
        <Route path="/StaffDashboard" element={<ProtectedRoute />}>
          <Route path="" element={<StaffDashboard />} />
        </Route>
        <Route path="/StaffManagement" element={<ProtectedRoute />}>
          <Route path="" element={<StaffManagement />} />
        </Route>
        <Route path="/IndustryApproval" element={<ProtectedRoute />}>
          <Route path="" element={<IndustryApproval />} />
        </Route>
        <Route path="/IndustryDashboard" element={<ProtectedRoute />}>
          <Route path="" element={<IndustryDashboard />} />
        </Route>
        <Route path="/ClientDashboard" element={<ProtectedRoute />}>
          <Route path="" element={<ClientDashboard />} />
        </Route>
        <Route path="/IndustryList" element={<IndustryList />} />
      
        <Route path="/ClientApprove" element={<ProtectedRoute />}>
          <Route path="" element={<ClientApprove />} />
        </Route>
        <Route path="/ComplaintForm" element={<ProtectedRoute />}>
          <Route path="" element={<ComplaintForm />} />
        </Route>
        <Route path="/AdminFeedback" element={<ProtectedRoute />}>
          <Route path="" element={<AdminFeedback />} />
        </Route>
        <Route path="/ViewAllCompanies" element={<ViewAllCompanies />} />
       
        <Route path="/BuyProduct" element={<ProtectedRoute />}>
          <Route path="" element={<BuyProduct />} />
        </Route>
        <Route path="/AddProduct" element={<ProtectedRoute />}>
          <Route path="" element={<AddProduct />} />
        </Route>
        <Route path="/payment/:productId" element={<ProtectedRoute />}>
          <Route path="" element={<PaymentPage />} />
        </Route>
        <Route path="/buy" element={<ProtectedRoute />}>
          <Route path="" element={<BuyProduct />} />
        </Route>
        <Route path="/thank" element={<ProtectedRoute />}>
          <Route path="" element={<PaymentSuccess />} />
        </Route>
        <Route path="/CheckApprovalStatus" element={<CheckApprovalStatus />} />
        
        {/* <Route path="/order-details" element={<ProtectedRoute />}>
          <Route path=""element={<OrderDetails />} />
        </Route> */}
      
        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path=""element={<OrderList />} />
        </Route>
        <Route path="/rawMaterials" element={<ProtectedRoute />}>
          <Route path=""element={<AddRawMaterial />} />
        </Route>

        <Route path="/rawMaterialsorder" element={<ProtectedRoute />}>
    <Route path="" element={<EditOrder />} />
  </Route>
        <Route path="/listOrders" element={<ProtectedRoute />}>
          <Route path=""element={<ListOrders />} />
        </Route>
        <Route path="/buyRawMaterial" element={<ProtectedRoute />}>
          <Route path=""element={<BuyRawMaterial />} />
        </Route>
        <Route path="/RPaymentPage/:productId" element={<ProtectedRoute />}>
          <Route path=""element={<RPaymentPage />} />
        </Route>
        
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
