const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Resto',
            version: '1.0.0',
            description: "API para DELIA Restaurant"
        },
        tags: [
            {
                name: 'users',
                description: 'Operaciones sobre users'
            },
            {
                name: 'products',
                description: 'Operaciones sobre products'
            },
            {
                name: 'orders',
                description: 'Operaciones sobre orders'
            },
            {
                name: 'payment methods',
                description: 'Operaciones sobre payment methods'
            },
        ]
    },
    apis: ['./src/routes/index.js'],
};

module.exports = swaggerOptions;