const redisClient = require("../../config/redisConnection");

const existsCache = ( req, res , next) => {

    redisClient.get("allProducts", (error, rep) => {
        if (error) {
            // hubo un error
            console.log(error);
        }
        if (rep) {
            res.status(200).json({
                success: true,
                status:200,
                response: JSON.parse(rep)
            });

        } else{
            next();
        }
    })

}

module.exports = existsCache;