const { OrderModel, ProductModel } = require("../models");
const { stateOrderUser, stateOrderAdmin } = require("../types/types");

const orderControllers = {

    // TODO: repensar esto
    newOrder: async (req, res) => {

        let { allOrders, stateOrder, paymentMethod, date, address } = req.body
        const { user: userLogged } = req;
        const { nickName, firstName, lastName, email, phone } = userLogged
        let response;
        let error;
        var status;
        ;
        //date
        const newDate = new Date();
        const currentDate = date ? date : `${newDate.getHours()}:${newDate.getMinutes()} ${newDate.getHours() < 12 ? 'AM' : 'PM'}`
        address = address ? address : userLogged.address
        try {
            stateOrder = stateOrder ? stateOrder.toUpperCase() : '';
            const existsStateOrder = stateOrderUser.includes(stateOrder);
            if (existsStateOrder) {

                const orderToSave = new OrderModel({
                    allOrders,
                    stateOrder,
                    address,
                    paymentMethod,
                    date: currentDate,
                    user: {
                        nickName,
                        firstName,
                        lastName,
                        email,
                        phone,
                    }
                })

                await orderToSave.save();
                const orderSaved = await OrderModel.find({ _id: orderToSave._id }).populate('allOrders')

                response = orderSaved;
                status = 200;

            } else {
                error = `Order status is not valid`
                status = 400;
            }

        } catch (err) {
            error = `Internal error on the server`
            status = 500;
            console.log(err);
        }
        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    },
    updateOrder: async (req, res) => {
        
        const { id } = req.params;
        let { stateOrder } = req.body;
        const { user: userLogged } = req;
        let response;
        let error;
        let status;

        try {

            stateOrder = stateOrder ? stateOrder.toUpperCase() : '';
            const existsStateOrder = userLogged.isAdmin ? stateOrderAdmin.includes(stateOrder) : stateOrderUser.includes(stateOrder);

            if (existsStateOrder) {

                const orderToUpdate = await OrderModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

                response = orderToUpdate;
                status = 200;

            } else {

                error = `Order status is not valid`
                status = 400;

            }
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

    getAllOrders: async (req, res) => {

        let response;
        let error;
        let status;

        try {

            const allOrders = await OrderModel.find();
            response= allOrders;
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

}

module.exports = orderControllers;