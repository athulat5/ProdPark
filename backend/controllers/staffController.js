const Staff = require('../models/StaffSchema');
const bcrypt = require('bcryptjs');

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
