const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

//Coneccion a mongoDB Julio Mejia Rodriguez, 01/02/2022
const conectardb = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // useFindAndModify: false,
           // useCreateIndex: true
        });
        console.log('db conectada');
    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectardb;