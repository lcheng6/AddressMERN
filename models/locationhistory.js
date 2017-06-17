// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var LocationHistorySchema = new Schema({
    location_result: {
        type: String
    },
    location_query: {
        type:String
    },
    date_queried: {
        type: Date
    }
});

// Create the Model
var LocationHistory =  mongoose.model("location_history", LocationHistorySchema);

// Export it for use elsewhere
module.exports = LocationHistory;
