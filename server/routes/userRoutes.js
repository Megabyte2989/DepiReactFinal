// @ts-nocheck
const express = require("express");
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken"); // for generating tokens
const User = require("../models/User");

const router = express.Router();


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details. The password will be hashed before saving.
 *     tags:
 *      - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password (will be hashed)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Error registering user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error registering user
 *                 error:
 *                   type: string
 */

// User Registration
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body; // Removed userId from request

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }); // Removed userId
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user by email and password, and returns a JWT token if credentials are correct.
 *     tags:
 *      - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The user's unique identifier (user._id)
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     role:
 *                       type: string
 *                       description: The user's role (e.g., admin, user)
 *       400:
 *         description: Wrong Email or Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wrong Email or Password
 *       500:
 *         description: Error logging in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error logging in
 *                 error:
 *                   type: string
 */


// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }

    // Generate a JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "PhPuZRIQFtZ4QmfbW1TZxiybpcLDDQB5",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        userId: user._id, // Use _id as the userId if it's an ObjectId
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
