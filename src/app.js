const express = require('express');
require('./database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json')

//app routes
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const productsRoutes = require('./routes/products-routes');
app.use('/products', productsRoutes);

const skusRoutes = require('./routes/skus-routes');
app.use('/skus', skusRoutes);

module.exports = app;