const { OrderModel } = require("../models");
const { stateOrderUser, stateOrderAdmin } = require("../types/types");

const orderControllers ={ 

     // TODO: repensar esto
    newOrder: async (req, res) => {

        let { allOrders, stateOrder, paymentMethod, date, total, user } = req.body
        const { user: userLogged } = req;
        const { nickName, firstName, lastName, email, phone, address } = userLogged
        let response;
        let error;
        let status;
        //date
        const newDate = new Date();
        const currentDate = date ? date : `${newDate.getHours()}:${newDate.getMinutes()} ${newDate.getHours() < 12 ? 'AM' : 'PM'}`

        const orderToSave = new OrderModel({ 
            allOrders,
            stateOrder,
            paymentMethod,
            date: currentDate,
            total: 1000,
            user: {
                nickName, 
                firstName, 
                lastName, 
                email, 
                phone, 
                address} 
        })
        await orderToSave.save()
       console.log(orderToSave)
    },
}

module.exports = orderControllers;

   // try {

        //     const orderToSave = new OrderModel({ ...req.body })
        //     await orderToSave.save();

        //     response= orderToSave;
        //     status= 201

        // } catch (err) {
        //     error = 'Internal error on the server';
        //     status = 500
        //     console.log(err);
        // }

        // res.status(status).json({
        //     success: response ? true : false,
        //     response,
        //     error
        // })