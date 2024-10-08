// const mongoose = require('mongoose');

// const clientSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     address: { type: String, required: true },
//     userPhoto: { type: String, required: true },
//     idCardPhoto: { type: String, required: true }
// },{
//     collection: 'client1'
// });

// module.exports = mongoose.model('Client', clientSchema);

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    userPhoto: { type: String, required: true },
    idCardPhoto: { type: String, required: true },
    status: { type: String, default: 'Pending' } // New field for approval status
});

module.exports = mongoose.model('Client', clientSchema);
