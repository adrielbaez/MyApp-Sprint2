const checkIsAdmin = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            success: false,
            response: 'You want to verify the role without validating the token first'
        });
    }

    const { isAdmin, firstName, lastName } = req.usuario;
    
    if ( isAdmin !== 'ADMIN_ROLE' ) {
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