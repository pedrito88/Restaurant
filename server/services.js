const fs = require('fs');
var outputFile = './files/restaurant.txt';
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const dbURL = process.env.DB_URL || "mongodb://localhost";

//Service Listerners
var services = function (app) {

    app.post('/write-record', function (req, res) {

        var reviewData = {

            RestaurantName: req.body.RestaurantName,
            foodType: req.body.foodType,
            location: req.body.location,
            criticRating: req.body.criticRating,
            patronRating: req.body.patronRating
        };

        MongoClient.connect(dbURL, {
            useUnifiedTopology: true
        }, function (err, client) {

            if (err) {
                return res.status(200).send(JSON.stringify({
                    msg: "ERROR: " + err
                }));
            } else {
                var dbo = client.db("restReview");
                dbo.collection("reviews").insertOne(reviewData, function (err) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({
                            msg: "ERROR: " + err
                        }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({
                            msg: "SUCCESS"
                        }));
                    }
                })
            }
        });

    });

    //get service
    app.get('/read-records', function (req, res) {

        MongoClient.connect(dbURL, {
            useUnifiedTopology: true
        }, function (err, client) {

            if (err) {

                return res.status(200).send(JSON.stringify({
                    msg: "ERROR: " + err
                }));
            } else {
                var dbo = client.db("restReview");

                dbo.collection("reviews").find().toArray(function (err, data) {

                    if (err) {

                        client.close();
                        return res.status(200).send(JSON.stringify({
                            msg: "ERROR: " + err
                        }));
                    } else {

                        client.close();
                        return res.status(200).send(JSON.stringify({
                            msg: "SUCCESS",
                            reviews: data
                        }));
                    }

                });
            }
        });

    });


    //delete services 
    app.delete('/delete-records', function (req, res) {
        var reviewId = req.body.ID;
        var r_id = new ObjectId(reviewId);
        var search = {
            _id: r_id
        };

        MongoClient.connect(dbURL, {
            useUnifiedTopology: true
        }, function (err, client) {

            if (err) {
                return res.status(200).send(JSON.stringify({
                    msg: "ERROR: " + err
                }));
            } else {
                var dbo = client.db("restReview");
                dbo.collection("reviews").deleteOne(search, function (err, data) {

                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({
                            msg: "ERROR: " + err
                        }));
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({
                            msg: "SUCCESS"
                        }));
                    }
                })
            }
        });
    });

    // end of new stuff
}



module.exports = services;
