var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
    
var ForecastSchema   = new Schema({
    forecast: String,
    icon: String,
    celsius: Number,
    timestamp: {type: Date, unique: true },
    day: String
});

// ForecastSchema.index({ request: 'text' });

// Compile model from schema
var Forecast = mongoose.model('Forecast', ForecastSchema);
module.exports = Forecast;