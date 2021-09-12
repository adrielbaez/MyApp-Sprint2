const checkHasEmptyFields = (req, res, next)=>{

    let hasEmptyFields = Object.values(req.body).some(fieldValue => fieldValue === '')
    if (hasEmptyFields) {
        res.json({
            success: false,
            error: 'All fields are required'
        })
        return false
    } 
    next()
}


module.exports= {
    checkHasEmptyFields
}