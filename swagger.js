const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Rerusif",
			version: "1.0.0",
			description: "This the api used for the rerusif backend",
		},
		servers: [
			{
               url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};


const specs = swaggerJsdoc(options);

module.exports = specs;