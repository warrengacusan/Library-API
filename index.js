const express = require('express');
const sequelize = require('./config/database')

const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT =3000;

//Associations
require('./models/index');

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/books', require('./routes/bookRoute'));
app.use('/authors', require('./routes/authorRoute'));
app.use('/members', require('./routes/memberRoute'));
app.use('/borrow-records', require('./routes/borrowRecordRoute'));

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

//DB + Server Start
sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('DB error:', err));

module.exports = app;