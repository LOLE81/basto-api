const express = require('express')
const routes = require("./routes/index");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { json } = require('express');
const app = express();
require('dotenv').config();

app.name = 'API';

app.use(express.urlencoded({ extended: true, limit: "50mb"}));
app.use(json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', routes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({message});
  });
  
  module.exports = app;