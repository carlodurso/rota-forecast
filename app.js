const http = require('http');
const express = require('express');
const router = require('./routes');
// const mongoose = require("mongoose");
// const Forecast = require('./models/forecast');

const app = express();

app.use(express.json());
app.use('/forecast', router);
app.use('/', function(req, res) {
    res.send('api works');
});

const port = 3000;

app.listen(process.env.PORT || port, () => {
    console.log('listening on port :' + port);
});