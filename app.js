const http = require('http');
const express = require('express');
const router = require('./api/routes');

const app = express();

app.use(express.json());

app.use('/forecast', router);

app.use('/', function(req, res) {
    res.send('forecast api works');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);