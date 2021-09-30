const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const validateJwt = async( req, res, next ) => {

    let token = req.header('Authorization');

    if ( !token ) {
        console.error("Access denied due to lack of authorisation information");
        return res.status(401).json({
            success: false,
            response: 'Access Denied'
        });
    }

    try {
        // short the bearer to validate my token
        token = token.split(' ')[1]
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // find to user with this uid
        const user = await UserModel.findById( uid );

        if( !user ) {
            console.error("Invalid token, the user was not found");
            return res.status(401).json({
                success: false,
                response: 'Access Denied: Unauthorized'
            })
        }
        
        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            success: false,
            response: 'Access Denied: Unauthorized'
        })
    }

}




module.exports = validateJwt;
