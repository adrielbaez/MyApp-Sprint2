const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('../docs/swaggerOptions');
const dataBaseConnection = require('../config/database');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.swaggerSpec = swaggerJsDoc(swaggerOptions);

        // connect database
        this.connectDB();

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            products: '/api/products',
            orders: '/api/orders',
            payments: '/api/payments',
            docs: '/api-docs',
        }
        
        //middlewares
        this.middlewares();
        //routes the app
        this.routes();
    }

    async connectDB() {
        await dataBaseConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // parseo del body
        this.app.use( express.json() );
        
        this.app.use(morgan('dev'));
    }

    routes() {

        // swagger routes view in localhost:4000/api-docs
        this.app.use(this.paths.docs, swaggerUI.serve, swaggerUI.setup(this.swaggerSpec));
        // users routes
        this.app.use( this.paths.users, require('../routes/user.route'));
        // auth routes
        this.app.use( this.paths.auth, require('../routes/auth.route'));
        // products routes
        this.app.use( this.paths.products, require('../routes/product.route'));
        // orders routes
        this.app.use( this.paths.orders, require('../routes/order.route'));
        // payments routes
        this.app.use( this.paths.payments, require('../routes/payment.route'));
    }

    listen() {
        this.app.listen( this.port, ()=> console.log(`App listening on port ${this.port}`));
    }
}


module.exports = { Server };