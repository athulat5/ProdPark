const multer = require('multer');
const path = require('path');

// Storage configuration for staff uploads
const staffStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/staff');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Storage configuration for general uploads
const generalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/industry');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload middleware for staff
const uploadStaff = multer({ storage: staffStorage });

// Multer upload middleware for general uploads
const uploadGeneral = multer({ storage: generalStorage });

module.exports = {
  uploadStaff,
  uploadGeneral
};
