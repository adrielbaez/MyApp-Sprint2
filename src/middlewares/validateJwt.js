const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');


const validateJwt = async( req, res, next ) => {

    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({
            success: false,
            response: 'No token on request'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const user = await UserModel.findById( uid );

        if( !user ) {
            return res.status(401).json({
                success: false,
                response: 'Invalid token'
            })
        }
        
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            success: false,
            response: 'Invalid token'
        })
    }

}




module.exports = {
    validateJwt
}