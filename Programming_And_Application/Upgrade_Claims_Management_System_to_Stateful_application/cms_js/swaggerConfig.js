const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Claims Management System',
        version: '1.0.0',
        description: 'This collection contains all the necessary API endpoints for managing policyholders, policies, and claims within a Claims Management System. Each endpoint supports various operations including creation, retrieval, updating, and deletion of records. This API is designed to facilitate the administration of insurance claims and related data, making it easier for users to handle insurance-related transactions.',
    },
    components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key',
                description: 'API key for authorization',
            },
        },
    },
    security: [
        {
            ApiKeyAuth: [],
        },
    ],
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}