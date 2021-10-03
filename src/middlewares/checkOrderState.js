const { OrderModel } = require("../models");

const checkOrderState = async(req, res, next)=>{
    
    const { id } = req.params;
    const { user: userLogged } = req;
    const { isAdmin } = userLogged
        let error;
        let status;

        try {
            const orderToFind = await OrderModel.findById(id);

            if (orderToFind.orderStatus === 'PENDIENTE' || isAdmin) {
                next();
            } else {

                error = `It is not possible to update the order`
                status = 400
                res.status(status).json({
                    success: false,
                    error
                })
                
            }
        } catch (err) {
            error = `Internal error on the server`
            res.status(500).json({
                success:false,
                error
            })
            console.log(err);
        }
    
}
 module.exports= checkOrderState