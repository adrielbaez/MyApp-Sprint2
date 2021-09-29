const { UserModel } = require('../models');

const checkUserDiscontinued = (req, res, next) => {
  //destructuro los datos que me llegan por el body
  const { user } = req.body;

  try {
    //verificar si el email y el nickname existe en la base de datos
    let existsEmail = await UserModel.findOne({ email: user });
    let existsNickName = await UserModel.findOne({ nickName: user });

    let userToLogin = existsEmail ? existsEmail : existsNickName;

    if (!userToLogin) {

      res.status(400).json({
        success: false,
        status: 400,
        error: 'This user does not exist in our database',
      });
      
    } else {

      if (userToLogin.discontinued) {
        res.status(400).json({
          success: false,
          status: 400,
          error: 'This user is suspended, please contact our support team',
        });

      } else {

        next();

      }

    }
  } catch (err) {
    res.status(500).json({
        success: false,
        status: 500,
        error :'Internal error on the server'
      });
    console.log(err);
  }
};

module.exports = checkUserDiscontinued;
