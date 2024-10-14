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

const generalStorage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/client');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/products');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// Multer upload middleware for staff
const uploadStaff = multer({ storage: staffStorage });

// Multer upload middleware for general uploads
const uploadGeneral = multer({ storage: generalStorage });
const uploadGeneral1 = multer({ storage: generalStorage1 });
// const ug = multer({ storage: storage1 });

module.exports = {
  uploadStaff,
  uploadGeneral,
  uploadGeneral1,
  // ug
};


