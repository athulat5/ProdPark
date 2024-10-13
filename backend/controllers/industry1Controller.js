const Industry1 = require('../models/industrySchema1');
const Industry = require('../models/industryModel1');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  console.log("Request to approve industry with ID:", req.params.id); // Log ID for debugging
  try {
    // Find the industry request by ID
    const industry1 = await Industry1.findById(req.params.id);
    if (!industry1) {
      return res.status(404).send('Industry request not found');
    }

    // Create a new instance of the Industry model with the data from the request
    const newIndustry = new Industry({
      username: industry1.username,
      email: industry1.email,
      address: industry1.address,
      phoneNumber: industry1.phoneNumber,
      password: industry1.password,
      idCard: industry1.idCard,
      landSquareFeet: industry1.landSquareFeet,
      industryDescription: industry1.industryDescription,
    });

    // Save the new industry to the 'industries' collection
    await newIndustry.save();

    // Delete the approved request from the 'industry1' collection
    await Industry1.findByIdAndDelete(req.params.id);

    // Send a success response
    res.status(201).send('Industry approved and moved to main collection');
  } catch (error) {
    console.error("Error approving industry:", error); // Log the error for debugging
    res.status(400).send('Error approving industry');
  }
};

// Get All Industry Requests
exports.getAllIndustryRequests = async (req, res) => {
 

  try {
    const industryRequests = await Industry.find();
    res.json(industryRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





exports.loginIndustry = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    // Find the industry by username
    const industry = await Industry.findOne({ username }); // Changed variable name to 'industry'
    
    if (!industry) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, industry.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: industry._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Return the token and a success message
    res.json({ token, message: "Login successfully" });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  exports.updateIndustry = async (req, res) => {
    try {
      const { password, ...updateData } = req.body;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      if (req.file) {
        updateData.idCard = req.file.path;
      }
      const updatedIndustry = await Industry1.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(updatedIndustry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.deleteIndustry = async (req, res) => {
    try {
      await Industry1.findByIdAndDelete(req.params.id);
      res.json({ message: 'Industry deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
