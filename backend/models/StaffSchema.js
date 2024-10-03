const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{collection:'staff'});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
