require('dotenv').config()

const express =require("express")
const mongoose = require('mongoose')
const adminroutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const path = require('path');

const app =express()

//middleware
app.use(express.json());
app.use('/uploads/staff', express.static(path.join(__dirname, 'uploads')));

// app.use((req, res, next) =>{
// console.log(req.path, req.method)
// next()
// })

//routes
app.use('/api/admin',adminroutes)
app.use('/api/staff', staffRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  //listen for request
app.listen(process.env.PORT, () => {
  console.log("Connected to db & Listening on port",process.env.PORT)
})
})
.catch((error) =>{ 
  console.log(error)
})

