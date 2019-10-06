const express = require('express');
const router = express.Router();
const Forecast = require('../models/forecast');
// const http = require('http');
const https = require('https');

// var url = 'http://api.openweathermap.org/data/2.5/forecast?id=2643743&APPID=12d171d3561ffd86fc9ccc6c79d0c97c';
var url = 'https://api.darksky.net/forecast/0c9754ea8065c38a4de8c8714434aaf3/51.5074,0.1278?exclude=currently,minutely,hourly,alerts,flags&units=auto';

// const data = [
//     {id: 1, title: 'Finalize project', order: 1, completed: false, createdOn: new Date()},
//     {id: 2, title: 'Book ticket to London', order: 2, completed: false, createdOn: new Date()},
//     {id: 3, title: 'Finish last article', order: 3, completed: false, createdOn: new Date()},
//     {id: 4, title: 'Get a new t-shirt', order: 4, completed: false, createdOn: new Date()},
//     {id: 5, title: 'Create dinner reservation', order: 5, completed: false, createdOn: new Date()},
// ];



// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (request, response) {
    // res.status(200).json(data);

//     Forecast.find(function(err, forecast) {
//       if (err)
//           res.send(err);

//       res.json(forecast);
//   });


    let req = https.get(url, function(res) {
      let data = '',
        json_data;

      res.on('data', function(stream) {
        data += stream;
      });
      res.on('end', function() {
        json_data = JSON.parse(data);

        response.status(200).json(json_data.daily.data);
      });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });
});


// router.get('forecast/:id', function (req, res) {
//     let found = data.find(function (item) {
//         return item.id === parseInt(req.params.id);
//     });
//     if (found) {
//         res.status(200).json(found);
//     } else {
//         res.sendStatus(404);
//     }
// });

  router.post('/', function (req, res) {

    var forecast = new Forecast();      // create a new instance of the Bear model
    forecast.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    forecast.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'day created!' });
    });
  });

// router.post('/', function (req, res) {
//     let itemIds = data.map(item => item.id);
//     let orderNums = data.map(item => item.order);
  
//     let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
//     let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
  
//     let newItem = {
//       id: newId,
//       title: req.body.title,
//       order: newOrderNum,
//       completed: false,
//       createdOn: new Date()
//     };
  
//     data.push(newItem);
  
//     res.status(201).json(newItem);
//   });
  
  router.put('/:id', function (req, res) {
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
  
  // router.delete('/:id', function (req, res) {
  //   let found = data.find(function (item) {
  //     return item.id === parseInt(req.params.id);
  //   });
  
  //   if (found) {
  //     let targetIndex = data.indexOf(found);
  
  //     data.splice(targetIndex, 1);
  //   }
  
  //   res.sendStatus(204);
  // });
  
module.exports = router;