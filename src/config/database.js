const mongoose = require('mongoose');

const dataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DataBase Connected');
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the DataBase');
    }
}

module.exports = dataBaseConnection;
