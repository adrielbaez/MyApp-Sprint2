const { OrderModel, ProductModel, PaymentModel } = require('../models');
const { stateOrderUser, stateOrderAdmin } = require('../types/types');

const orderControllers = {
  // TODO: repensar esto
  newOrder: async (req, res) => {
    let { allOrders, orderStatus, paymentMethod, date, address } = req.body;
    paymentMethod = paymentMethod.toUpperCase();
    const { user: userLogged } = req;
    const { _id } = userLogged;
    let response;
    let error;
    var status;
    //date
    const newDate = new Date();
    const currentDate = date
      ? date
      : `${newDate.getHours()}:${newDate.getMinutes()} ${
          newDate.getHours() < 12 ? 'AM' : 'PM'
        }`;
    address = address ? address : userLogged.address;
    try {
      orderStatus = orderStatus ? orderStatus.toUpperCase() : '';
      const existsStateOrder = stateOrderUser.includes(orderStatus);

      const paymentMethods = await PaymentModel.find();

      const availablePaymentMethod = paymentMethods.some(
        (payment) => payment.paymentMethod === paymentMethod
      );

      if (availablePaymentMethod) {
        if (existsStateOrder) {
          allOrders = allOrders.filter(order => order.amount > 0 )
          const orderToSave = new OrderModel({
            allOrders,
            orderStatus,
            address,
            paymentMethod,
            date: currentDate,
            user: _id,
          });

          await orderToSave.save();
          const orderSaved = await OrderModel.find({
            _id: orderToSave._id,
          }).populate('allOrders.idProduct');

          response = orderSaved;
          status = 200;
        } else {
          error = `Order status is not valid`;
          status = 400;
        }
      } else {
        error = `Payment Method not available`;
        status = 400;
      }
    } catch (err) {
      error = `Internal error on the server`;
      status = 500;
      console.log(err);
    }
    res.status(status).json({
      success: response ? true : false,
      status,
      response,
      error,
    });
  },
  updateOrder: async (req, res) => {
    const { id } = req.params;
    let { orderStatus, allOrders } = req.body;
    const { user: userLogged } = req;
    let response;
    let error;
    let status;
    try {
      orderStatus = orderStatus ? orderStatus.toUpperCase() : '';
      const existsStateOrder = userLogged.isAdmin
        ? stateOrderAdmin.includes(orderStatus)
        : stateOrderUser.includes(orderStatus);

      if (existsStateOrder) {
        allOrders = allOrders.filter(order => order.amount > 0 )
        const orderToUpdate = await OrderModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, orderStatus, allOrders },
          { new: true }
        );

        response = orderToUpdate;
        status = 200;
      } else {
        error = `Order status is not valid`;
        status = 400;
      }
    } catch (err) {
      error = `Internal error on the server`;
      status = 500;
      console.log(err);
    }

    res.status(status).json({
      success: response ? true : false,
      status,
      response,
      error,
    });
  },

  getOneOrder: async (req, res) => {
    const { id } = req.params;
    let response;
    let error;
    let status;

    try {
      const orderToFind = await OrderModel.findById(id).populate('allOrders.idProduct');;
      response = orderToFind;
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
      error,
    });
  },

  getAllOrders: async (req, res) => {
    let response;
    let error;
    let status;

    try {
      const allOrders = await OrderModel.find();
      response = allOrders;
      status = 200;
    } catch (err) {
      error = 'Internal error on the server';
      status = 500;
      console.log(err);
    }
    res.status(status).json({
      success: response ? true : false,
      status,
      response,
      error,
    });
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;
    let response;
    let error;
    let status;

    try {
      const orderDeleted = await OrderModel.findOneAndRemove({
        _id: id,
      });
      response = {
        orderDeleted,
      };
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
      error,
    });
  },
};

module.exports = orderControllers;
