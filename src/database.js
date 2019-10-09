const mongoose = require('mongoose');

// Database
const MONGO_LOCAL = 'mongodb://localhost/products';

mongoose.connect(MONGO_LOCAL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const db = mongoose.connection;

// Load models
require('./models/products-with-skus-model');

//db status
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});