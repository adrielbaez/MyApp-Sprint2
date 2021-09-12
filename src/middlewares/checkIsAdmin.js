const checkIsAdmin = ( req, res , next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            success: false,
            response: 'You want to verify the role without validating the token first'
        });
    }

    const { isAdmin, firstName, lastName } = req.user;
    
    if ( !isAdmin ) {
        return res.status(401).json({
            success: false,
            response: `${ firstName } ${ lastName } is not an administrator`
        });
    }

    next();
}

module.exports ={
    checkIsAdmin
}