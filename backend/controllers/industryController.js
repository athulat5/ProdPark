const Industry = require('../models/industrySchema1');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register Industry
exports.registerIndustry = async (req, res) => {
  const { username, email, address, phoneNumber, password, idCard, landSquareFeet, industryDescription } = req.body;
  console.log(req.body);
  if (!req.file) {
    return res.status(400).send('ID Card is required');
  }
  const idCardPath = req.file.path;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newIndustry = new Industry({
      username,
      email,
      address,
      phoneNumber,
      password: hashedPassword,
      idCard: idCardPath,
      landSquareFeet,
      industryDescription
    });

    await newIndustry.save();
    res.status(201).send('Industry registered successfully');
  } catch (error) {
    res.status(400).send('Error registering industry');
  }
};



exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const updatedIndustry = await Industry.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedIndustry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteIndustry = async (req, res) => {
  try {
    await Industry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Industry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
