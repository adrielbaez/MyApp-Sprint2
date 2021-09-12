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
            
        } catch (err) {
            error = 'Internal error on the server';
            status = 500
            console.log(err);
        }
        res.status(status).json({
            success: response ? true : false,
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
            response,
            error
        })
    }
}



module.exports = {
    ...productControllers
}