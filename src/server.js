require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(express.json());
app.use(cors());

//synchronize the database before starting the server
syncDatabase()
.then(() => {
    console.log('Database synchronized successfully');

    app.use('/api/v1/cars', carRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Error synchronizing database:', error);
});

