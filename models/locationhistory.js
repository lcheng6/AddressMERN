// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var LocationHistorySchema = new Schema({
    locationResult: {
        type: String
    },
    locationQuery: {
        type:String
    },
    dateQueried: {
        type: Date
    }
});

// Create the Model
var LocationHistory =  mongoose.model("location_history", LocationHistorySchema);

// Export it for use elsewhere
module.exports = LocationHistory;
