const redisClient = require("../config/redisConnection");
const { ProductModel } = require("../models");

const productControllers = {
    
    newProduct: async(req, res) => {
        let response;
        let error;
        let status;

        try {

            const productToSave = new ProductModel({ ...req.body })
            await productToSave.save();

            response= productToSave;
            status= 201

        } catch (err) {
            error = 'Internal error on the server';
            status = 500
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            status,
            response,
            error
        })
    },

    getAllProducts: async(req, res)=>{
        let response;
        let error;
        let status;

        try {

            const allProducts = await ProductModel.find();
            response= allProducts;
            status=200;
            //added the products to the cache
            redisClient.set("allProducts", JSON.stringify(allProducts), 'EX', '60');
            
        } catch (err) {
            error = 'Internal error on the server';
            status = 500
            console.log(err);
        }
        res.status(status).json({
            success: response ? true : false,
            status,
            response,
            error
        })
    },

    getOneProduct: async(req, res)=>{
        const { id } = req.params
        let response;
        let error;
        let status;

        try {
            const productToFind = await ProductModel.findById( id );
            response= productToFind;
            status = 200;
            
        } catch (err) {
            error = 'Internal error on the server';
            status = 500
            console.log(err);
        }
        res.status(status).json({
            success: response ? true : false,
            status,
            response,
            error
        })
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        let response;
        let error;
        let status;

        try {
            const productToUpdate = await ProductModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
            response = productToUpdate;
            status = 200;
        } catch (err) {
            error = `Internal error on the server`
            status = 500
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            status,
            response,
            error
        })
    },

    updatePrice: async (req, res) => {
        const { id } = req.params;
        const { price } = req.body;
        let response;
        let error;
        let status;

        try {
            const productToUpdate = await ProductModel.findOneAndUpdate({ _id: id }, { price }, { new: true });
            response = productToUpdate;
            status = 200;
            //delete key to the cache
            redisClient.del('allProducts')
        } catch (err) {
            error = `Internal error on the server`
            status = 500
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            status,
            response,
            error
        })
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        let response;
        let error;
        let status;

        try {
            const productDeleted = await ProductModel.findOneAndRemove({ _id: id })
            response = {
                productDeleted
            }
            status = 200;
        } catch (err) {
            error = `Internal error on the server`;
            status = 500;
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            status,
            response,
            error
        })
    }
}



module.exports = productControllers;