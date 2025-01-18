const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('@routes/index'); 
const { connectDatabase } = require('./database'); 

const server = (port) => { 
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger('dev'));
    app.use(cookieParser());

    // Connect to the database
    connectDatabase().then(() => {
        app.use('/api/v1', routes);

        // Start the server
        app.listen(port, () => { 
            console.log(`Server is running on http://localhost:${port}`);
        });
    }).catch((err) => {
        console.error('Error connecting to database:', err);
        process.exit(1);
    });

    return app; 
};

module.exports = server; 