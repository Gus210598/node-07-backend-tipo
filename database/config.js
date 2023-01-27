const mongoose = require("mongoose")



const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
            // useFindAndModify: false
            // useCreateIndex: true,
        });

        console.log('');
        console.log('Base de datos online');
        console.log('Arriba los cuescos de la DB');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de levantar la base de datos');
    }

}

module.exports = {
    dbConnection
}
