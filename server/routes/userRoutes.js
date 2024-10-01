// @ts-nocheck
const express = require('express');
const bcrypt = require('bcrypt'); // for password hashing
const jwt = require('jsonwebtoken'); // for generating tokens
const User = require('../models/User');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { userId, firstName, lastName, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ userId, firstName, lastName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const token = jwt.sign({ email: user.email }, "PhPuZRIQFtZ4QmfbW1TZxiybpcLDDQB5", { expiresIn: '1h' });

        res.status(200).json({ token, user: { userId: user.userId, firstName: user.firstName, lastName: user.lastName, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});


module.exports = router;

