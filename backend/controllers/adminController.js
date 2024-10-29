const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Login Admin
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body);
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).send('Admin not found');

    // const isMatch = await (password == admin.password)? true : false;
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, message: "login successfully" });
  } catch (error) {
    res.status(400).send('Error logging in');
    console.log(error);
  }
};

