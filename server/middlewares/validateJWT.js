// Import necessary modules from Express and jsonwebtoken
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Define a middleware function to validate JSON Web Tokens (JWTs)
const validateJWT = (req, res, next) => {
    // Get the authorization header from the request
    const authorizationHeader = req.get("authorization");

    // If the authorization header is not provided, return a 403 error
    if (!authorizationHeader) {
        return res.status(403).json("Authorization header was not provided");
    }

    // Extract the token from the authorization header
    const token = authorizationHeader.split(" ")[1];

    // If the token is not found, return a 403 error
    if (!token) {
        return res.status(403).json("Bearer token not found");
    }

    // Verify the token using the secret key
    jwt.verify(
        token,
        "PhPuZRIQFtZ4QmfbW1TZxiybpcLDDQB5",
        async (err, payload) => {
            // If an error occurs during verification, return a 403 error
            if (err) {
                return res.status(403).json("Invalid token");
            }

            // If the payload is not provided, return a 403 error
            if (!payload) {
                return res.status(403).json("Invalid token payload");
            }

            // Find the user in the database using the email from the payload
            const user = await User.findOne({ email: payload.email });

            // Attach the user to the request object
            req.user = user;

            // Call the next middleware function in the chain
            next();
        }
    );
};

// Export the validateJWT middleware function
module.exports = validateJWT;
