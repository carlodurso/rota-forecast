var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 2500))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})



// import express from 'express';
// import db from './models/db';

// const express = require('express');
// const db = require('./models/db');

// // Set up the express app
// const app = express();

// app.get('/', function(request, response) {
//   response.send('Hello World!')
// })

// // get all forecast
// app.get('/api/v1/forecast', (req, res) => {
//   res.status(200).send({
//     success: 'true',
//     message: 'api retrieved successfully',
//     todos: db
//   })
// });
// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`)
// });