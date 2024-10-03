const Staff = require('../models/StaffSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Staff
exports.registerStaff = async (req, res) => {
  const { username, email, mobileNumber, password, confirmPassword } = req.body;
  const photo = req.file.path;
  console.log(req.body);
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({
      username,
      email,
      mobileNumber,
      password: hashedPassword,
      photo
    });

    await newStaff.save();
    res.status(201).send('Staff registered successfully');
  } catch (error) {
    res.status(400).send('Error registering staff');
  }
};


// Login Staff
exports.loginStaff = async (req, res) => {
  const { username, password } = req.body;
  try {
    const staff = await Staff.findOne({ username });
    if (!staff) return res.status(400).json({ message: 'Staff not found' });

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: staff._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, message: "login successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
