require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const adminroutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const industry1Routes = require('./routes/industry1Routes');
const industryRoutes = require('./routes/industryRoutes');
const { uploadStaff, uploadGeneral } = require('./config/multerConfig');
const clientRoutes = require('./routes/clientRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes')
const pay =require('./routes/paymentr');
const path = require('path');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow your React app's origin
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // Include other methods as needed
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use('/uploads/staff', express.static(path.join(__dirname, 'uploads/staff')));
app.use('/uploads/industry', express.static(path.join(__dirname, 'uploads/industry')));
app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products'))); 

// Routes
app.use('/api/admin', adminroutes);
app.use('/api/staff', staffRoutes);
app.use('/api/industry1', industry1Routes(uploadGeneral));
app.use('/api/industry', industryRoutes(uploadGeneral));
app.use('/api/client', clientRoutes);
app.use('/api/complaints', authMiddleware, complaintRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', pay)
// Connect to DB
mongoose.connect(process.env.MONGO_URI).then(() => {
  // Listen for requests
  app.listen(process.env.PORT, () => {
    console.log("Connected to db & Listening on port", process.env.PORT);
  });
}).catch((error) => {
  console.log(error);
});
