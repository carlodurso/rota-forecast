const mongoose = require("mongoose");
const Forecast = require('./forecast');
const https = require('https');

var url = 'https://api.darksky.net/forecast/0c9754ea8065c38a4de8c8714434aaf3/51.5074,0.1278?exclude=currently,minutely,hourly,alerts,flags&units=auto';
var mongourl = process.env.MONGODB_URI;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, res) {
  if (err) console.log ('ERROR connecting to: ' + mongourl + '. ' + err);
})

var util = new Promise(function(resolve, reject) {
  /* do some stuff here */

  if (resolve) {
    let req = https.get(url, function(res) {
      let data = '',
        json_data;

      res.on('data', function(stream) {
        data += stream;
      });
      res.on('end', function() {
        json_data = JSON.parse(data);
      

        var json = json_data.daily.data;

          for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            var date = new Date(obj.time * 1000);
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            var yy = date.getFullYear();
            var day = dd + '' + mm; //(EU)
            console.log(day);
            Forecast.findOneAndUpdate({timestamp: obj.time},{$set:{timestamp: obj.time, celsius:Math.ceil(obj.temperatureHigh),forecast: obj.summary, icon: obj.icon, forecast: obj.summary, day: day}},{upsert:true, new: true}, 
            function(err, doc){
                
            });
          }
      });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });
  } else {
      console.log(reject);
  }
});

  setTimeout((function() {
    return process.exit(200);
  }), 15000);


  process.on('exit', function(code) {
    return console.log(`Succesfully executed scipt.\nCode: ${code}`);
  });