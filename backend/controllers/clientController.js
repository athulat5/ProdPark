const Client = require('./../models/ClientModel');

exports.registerClient = async (req, res) => {
    console.log(req.body);
    try {
        const { username, password, confirmPassword, address } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const userPhoto = req.files['userPhoto'][0].path;
        const idCardPhoto = req.files['idCardPhoto'][0].path;

        const newClient = new Client({ username, password, address, userPhoto, idCardPhoto });
        await newClient.save();

        res.status(201).json({ message: 'Client registered successfully. Awaiting approval.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.approveClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        await Client.findByIdAndUpdate(clientId, { status: 'Approved' });
        res.status(200).json({ message: 'Client approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.rejectClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        await Client.findByIdAndUpdate(clientId, { status: 'Rejected' });
        res.status(200).json({ message: 'Client rejected successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.loginClient = async (req, res) => {
    console.log(req.data);
    try {
        const { username, password } = req.body;
        const client = await Client.findOne({ username, password });

        if (!client) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        if (client.status !== 'Approved') {
            return res.status(403).json({ message: 'Client is not approved. Please wait for approval.' });
        }

        // Generate a token or session here if needed
        res.status(200).json({ message: 'Login successful', token: 'your-token-here' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
