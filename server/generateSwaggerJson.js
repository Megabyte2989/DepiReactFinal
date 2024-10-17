const swaggerJsDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');
const swaggerOptions = require('./swagger'); // Import your Swagger options

// Generate the Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Save the generated Swagger JSON to the public directory
fs.writeFileSync(path.join(publicDir, 'swagger.json'), JSON.stringify(swaggerDocs, null, 2), 'utf-8');
console.log('Swagger JSON generated successfully.');
