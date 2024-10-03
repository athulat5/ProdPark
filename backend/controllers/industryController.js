const Industry = require('../models/industrySchema');
const bcrypt = require('bcryptjs');

// Register Industry
exports.registerIndustry = async (req, res) => {
  const { username, email, address, phoneNumber, password, confirmPassword } = req.body;
  const idCard = req.file.path;
  console.log(req.body);
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newIndustry = new Industry({
      username,
      email,
      address,
      phoneNumber,
      password: hashedPassword,
      idCard
    });

    await newIndustry.save();
    res.status(201).json({ message: 'Industry registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering industry' });
  }
};
