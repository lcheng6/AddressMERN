// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Click schema
var Click = require("./models/click");
var LocationHistory = require("./models/locationhistory");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://127.0.0.1:27017/test");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

    // This GET request will search for the latest clickCount
    // Click.find({}).exec(function(err, doc) {
    //
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.send(doc);
    //     }
    // });
    LocationHistory.find({}).exec(function(err, docs) {
        if (err) {
            console.log("Can't find data");
            return res.send(500, { error: err });
        }else {
            var returnData = [];
            for(let i = 0; i<docs.length; i++) {
                let doc = docs[i];
                returnData.push({
                    location:doc.locationQuery,
                    result: doc.locationResult,
                    date: doc.dateQueried
                })
            }
            console.log(returnData);
            return res.status(200).send(returnData);
        }
    })
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api", function(req, res) {

    // var clickID = req.body.clickID;
    // var clicks = parseInt(req.body.clicks);
    //
    // // Note how this route utilizes the findOneAndUpdate function to update the clickCount
    // // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
    // // If included, Mongoose will create a new document matching the description if one is not found
    // Click.findOneAndUpdate({
    //     clickID: clickID
    // }, {
    //     $set: {
    //         clicks: clicks
    //     }
    // }, { upsert: true }).exec(function(err) {
    //
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.send("Updated Click Count!");
    //     }
    // });

    var locationQuery = req.body.location;
    var locationResult = req.body.result;

    // LocationHistory.upsert(record).exec(function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.send("Updated Location History");
    //     }
    // })
    // LocationHistory.findOneAndUpdate({}, record, {upsert:false}, function (err, doc) {
    //     if (err) return res.send(500, { error: err });
    //     return res.send("Updated Location History");
    // })
    var tmp = new LocationHistory();
    tmp.locationQuery = locationQuery;
    tmp.locationResult = locationResult;
    tmp.dateQueried = new Date();
    tmp.save(function(err, doc) {
        if(err) {
            res.status(500).send("Error saving location history");
        }else {
            res.status(500).send(doc);
        }
    });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
