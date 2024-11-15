const multer = require('multer');
const path = require('path');

// Configure multer for storing images in the uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/rawmaterial'); // Ensure this path matches where images are stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

module.exports = upload;
