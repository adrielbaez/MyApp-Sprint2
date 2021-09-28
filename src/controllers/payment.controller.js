const { PaymentModel } = require('../models');

const paymentControllers = {
  newPaymentMethod: async (req, res) => {
    let { paymentMethod } = req.body;
    paymentMethod = paymentMethod.toUpperCase();
    let response;
    let error;
    let status;

    try {
      const paymentToSave = new PaymentModel({ ...req.body, paymentMethod });
      await paymentToSave.save();

      response = paymentToSave;
      status = 201;
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

  getAllPaymentMethods: async (req, res) => {
    let response;
    let error;
    let status;

    try {
      const allPaymentMethods = await PaymentModel.find();
      response = allPaymentMethods;
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

  getOneMethodPayment: async (req, res) => {
    const { id } = req.params;
    let response;
    let error;
    let status;

    try {
      const paymentMethodToFind = await PaymentModel.findById(id);
      response = paymentMethodToFind;
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

  updateMethodPayment: async (req, res) => {
    const { id } = req.params;
    let response;
    let error;
    let status;

    try {
      const paymentMethodToUpdate = await PaymentModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      response = paymentMethodToUpdate;
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

  deletePaymentMethod: async (req, res) => {
    const { id } = req.params;
    let response;
    let error;
    let status;

    try {
      const paymentMethodDeleted = await PaymentModel.findOneAndRemove({
        _id: id,
      });
      response = {
        paymentMethodDeleted,
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

module.exports = paymentControllers;
