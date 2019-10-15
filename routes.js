const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Forecast = require('forecast.js');
const https = require('https');
var js2xmlparser = require("js2xmlparser");


var url = 'https://api.darksky.net/forecast/0c9754ea8065c38a4de8c8714434aaf3/51.5074,0.1278?exclude=currently,minutely,hourly,alerts,flags&units=auto';
var mongourl = process.env.MONGODB_URI || 'mongodb://localhost/forecast';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + mongourl + '. ' + err);
  } else {
  console.log ('connected to: ' + mongourl);
  }
})


// router.get('*', function(req, res) {  res.render('error');});
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

            Forecast.findOneAndUpdate({timestamp: obj.time},{$set:{timestamp: obj.time, celsius:Math.ceil(obj.temperatureHigh),forecast: obj.summary, icon: obj.icon, forecast: obj.summary, day: day}},{upsert:true, new: true}, 
            function(err, doc){
                if (err) return res.send(500, { error: err });
                // console.log(doc.id);
            });
          }
      });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });
});


router.get('/:query', function(req, res) {
    var findOne = req.params.query;

    var query = Forecast.findOne({ 'day': findOne });

    
    query.exec().then(function (forecast) {
      // handle success
      var data = {
        "temp" : forecast.celsius + " °C", 
        "icon" : forecast.icon,
        "forecast" : forecast.forecast
      }

      if (forecast) { 
        res.set('Content-Type', 'text/xml');
        res.send(js2xmlparser.parse("forecast", data)); 
      }
      }).catch(function (err) {
          // handle error
          return res.status(404).send('data not found!');
          // if (err) throw err; 
         });
})
  
module.exports = router;