const UserModel = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const { generateJwt } = require("../helpers");
const userControllers = {

    signup: async (req, res) => {
        let { email, password } = req.body
        let response;
        let error;
        let status;

        let emailExists = await UserModel.findOne({ email })

        if (!emailExists) {
            try {
                password = bcryptjs.hashSync(password, 10);
                const userToSave = new UserModel({ ...req.body, password })
                await userToSave.save()

                response = userToSave;
                status = 201
            } catch (err) {
                error = 'Internal error on the server';
                status = 500
                console.log(err);
            }
        } else {
            error = 'The email already exists in our databases'
            status = 400
        }

        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    },

    signin: async (req, res) => {
        //destructuro los datos que me llegan por el body
        const { password, user } = req.body
        let response;
        let error;
        let status;
        //verificar si el email y el nickname existe en la base de datos

        try {
            let existsEmail = await UserModel.findOne({ email: user });
            let existsNickName = await UserModel.findOne({ nickName: user });

            if (existsEmail || existsNickName) {

                let userToLogin = existsEmail ? existsEmail : existsNickName

                //verifico si la contraseña es correcta
                const passwordMatch = bcryptjs.compareSync(password, userToLogin.password)

                if (passwordMatch) {

                    //genero token
                    const token = await generateJwt( userToLogin._id ); 
                    response = {
                        user: userToLogin,
                        token
                    }
                    status = 200;

                } else {

                    error = 'Incorrect email and/or password'
                    status = 400;
                }

            } else {
                error = 'There is no email/nickname in our database'
                status = 400;
            }

        } catch (err) {
            error = 'Internal error on the server'
            status = 500;
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    },
    getAllUsers: async (req, res) => {
        let response;
        let error;
        let status;

        try {
            const allUsers = await UserModel.find();
            response = allUsers;
            status = 200
        } catch (err) {
            error = `Internal error on the server`
            status = 500
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    },

    getOneUser: async (req, res) => {
        const { id } = req.params;
        let response;
        let error;
        let status;

        try {
            const userToFind = await UserModel.findById(id);
            response = userToFind;
            status = 200
        } catch (err) {
            error = `Internal error on the server`
            status = 500
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        let response;
        let error;
        let status;

        try {
            const userToUpdate = await UserModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
            response = userToUpdate;
            status = 200;
        } catch (err) {
            error = `Internal error on the server`
            status = 500
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        let response;
        let error;
        let status;

        try {
            const userDeleted = await UserModel.findOneAndRemove({ _id: id })
            response = {
                userDeleted
            }
            status = 200;
        } catch (err) {
            error = `Internal error on the server`;
            status = 500;
            console.log(err);
        }

        res.status(status).json({
            success: response ? true : false,
            response,
            error
        })
    }
}

module.exports = userControllers;