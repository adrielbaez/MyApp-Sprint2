const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Resto',
            version: '1.0.0',
            description: "API DELIA Restaurant"
        },
        tags: [
            {
                name: 'users',
                description: 'Operations on users'
            },
            {
                name: 'products',
                description: 'Operations on products'
            },
            {
                name: 'orders',
                description: 'Operations on orders'
            },
            {
                name: 'payment methods',
                description: 'Operations on payment methods'
            },
        ]
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;