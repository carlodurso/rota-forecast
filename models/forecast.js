var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ForecastSchema   = new Schema({
    date: Date,
    forecast: String
});

// Compile model from schema
var Forecast = mongoose.model('Forecast', ForecastSchema);
module.exports = Forecast;