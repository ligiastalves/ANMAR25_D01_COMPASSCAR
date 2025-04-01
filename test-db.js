const sequelize = require('./config/database');

async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully');
    } catch (error){
        console.error('Error connecting to database', error);
    } finally {
        await sequelize.close();
    }
    
}

testConnection();