const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use('/forecast', router);
app.use(express.static('public'));
app.use('/icons', router);

app.use('/', function(req, res) {
    res.send('api works');
});

const port = 3000;

app.listen(process.env.PORT || port, () => {
    console.log('listening on port :' + port);
});