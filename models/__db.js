var mongoose   = require('mongoose');
// mongoose.connect('mongodb://test:test12@ds343217.mlab.com:43217/heroku_4qcqz514')


// var MongoClient = require('mongodb').MongoClient, 
//     assert = require('assert');

// // Connection URL
// var url = 'mongodb://localhost:27017/forecast';

// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   db.close();
// });



//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/forecast';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));