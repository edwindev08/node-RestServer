const mongoose = require('mongoose');

const dbConn = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('db Online')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos');
        
    }


}



module.exports = {
    dbConn
}