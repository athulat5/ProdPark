const Industry1 = require('../models/industrySchema1');
const Industry = require('../models/industryModel1');
const bcrypt = require('bcryptjs');

// Register Industry
exports.registerIndustry = async (req, res) => {
  const { username, email, address, phoneNumber, password, idCard, landSquareFeet, industryDescription } = req.body;
  
  if (!req.file) {
    return res.status(400).send('ID Card is required');
  }
  const idCardPath = req.file.path;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newIndustry1 = new Industry1({
      username,
      email,
      address,
      phoneNumber,
      password: hashedPassword,
      idCard: idCardPath,
      landSquareFeet,
      industryDescription
    });

    await newIndustry1.save();
    res.status(201).send('Industry registration request submitted successfully wait for Approvel');
  } catch (error) {
    res.status(400).send('Error registering industry');
  }
};

// Approve Industry
exports.approveIndustry = async (req, res) => {
  try {
    const industry1 = await Industry1.findById(req.params.id);
    if (!industry1) {
      return res.status(404).send('Industry request not found');
    }

    const newIndustry = new Industry({
      username: industry1.username,
      email: industry1.email,
      address: industry1.address,
      phoneNumber: industry1.phoneNumber,
      password: industry1.password,
      idCard: industry1.idCard,
      landSquareFeet: industry1.landSquareFeet,
      industryDescription: industry1.industryDescription
    });

    await newIndustry.save();
    await Industry1.findByIdAndDelete(req.params.id);
    res.status(201).send('Industry approved and moved to main collection');
  } catch (error) {
    res.status(400).send('Error approving industry');
  }
};

// Get All Industry Requests
exports.getAllIndustryRequests = async (req, res) => {
  try {
    const industryRequests = await Industry1.find();
    res.json(industryRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.loginIndustry = async (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body);
//     try {
//       const user = await User.findOne({ username, role: 'industry' });
//       if (!user) return res.status(400).json({ message: 'Industry user not found' });
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token, message: 'Industry user logged in successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//    }
//   }; 

  exports.loginIndustry = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
      const industry1 = await industry1.findOne({ username });
      if (!staff) return res.status(400).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, industry1.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: industry1._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token, message: "login successfully" });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
