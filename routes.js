const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const Forecast = require('./models/forecast');
const https = require('https');



// var url = 'http://api.openweathermap.org/data/2.5/forecast?id=2643743&APPID=12d171d3561ffd86fc9ccc6c79d0c97c';
var url = 'https://api.darksky.net/forecast/0c9754ea8065c38a4de8c8714434aaf3/51.5074,0.1278?exclude=currently,minutely,hourly,alerts,flags&units=auto';
var mongourl = 'mongodb://localhost/forecast';

// mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + mongourl + '. ' + err);
  } else {
  console.log ('connected to: ' + mongourl);
  }
})


router.get('/', function (request, response) {

    let req = https.get(url, function(res) {
      let data = '',
        json_data;

      res.on('data', function(stream) {
        data += stream;
      });
      res.on('end', function() {
        json_data = JSON.parse(data);
      

        var json = json_data.daily.data;
        response.status(200).json(json);

          for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            var date = new Date(obj.time *1000);
            // var day = date.toLocaleDateString();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            var yy = date.getFullYear();
            var day = dd + '' + mm; //(EU)

            var forecast = new Forecast({
              forecast: obj.summary,
              icon: obj.icon,
              celsius: Math.ceil(obj.temperatureHigh),
              timestamp: obj.time,
              day: day
            });

            forecast.save(function(error) {
    
              if (error) {
                console.error(error);
              }
            });
          }
      });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });
});


router.get('/:query', function(req, res) {
  var query = req.params.query;
  
  Forecast.find({
     'day': query
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.status(200).json(result);
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})

  
  router.put('/:query', function (req, res) {
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
  
    if (found) {
      let updated = {
        id: found.id,
        title: req.body.title,
        order: req.body.order,
        completed: req.body.completed
      };
  
      let targetIndex = data.indexOf(found);
  
      data.splice(targetIndex, 1, updated);
  
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  
module.exports = router;