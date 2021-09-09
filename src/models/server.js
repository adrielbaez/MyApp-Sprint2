const express = require('express');
const cors = require('cors');
//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('../docs/swaggerOptions');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.swaggerSpec = swaggerJsDoc(swaggerOptions);

        this.paths = {
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

    middlewares() {
        // CORS
        this.app.use( cors() );

        // parseo del body
        this.app.use( express.json() );
    }

    routes() {

        this.app.use(this.paths.docs, swaggerUI.serve, swaggerUI.setup(this.swaggerSpec));
        // view in localhost:4000/api-docs

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


module.exports = Server;