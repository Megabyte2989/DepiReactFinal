const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ramy rents API",
            version: "1.0.0",
            description: "API documentation for ramy rents",
        },
        servers: [
            {
                url: "https://depi-react-final.vercel.app",
            },
        ],
    },
    // Path to the API routes where you'll add Swagger comments
    apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;