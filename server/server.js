const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use("/client",express.static(path.resolve(__dirname + "/../client")));

//Router listerners
app.get('/write-restaurant', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + '/../client/write-restaurant.html'));
});

app.get('/browse-database', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + '/../client/browse-database.html'));
});




//Service Listerners
var outputFile = './files/restaurant.txt';
app.post('/write-record', function (req, res) {
    var data = req.body.data;
    console.log(data);

    if (fs.existsSync(outputFile)) {
        data = "," + data;
    };

    fs.appendFile(outputFile, data, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Success");
        }
    });
});

//get service
app.get('/read-records', function(req, res){
    fs.readFile(outputFile, 'utf8', function(err, data){
        if(err){
            res.send(err);
        } else{
            data = "[" + data + "]";
            res.send(data);
        }
    });
});

app.listen(6200);
console.log('Server is now running....');
