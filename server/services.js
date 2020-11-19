const fs = require('fs');


//Service Listerners
var services = function (app) {
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
    app.get('/read-records', function (req, res) {
        fs.readFile(outputFile, 'utf8', function (err, data) {
            if (err) {
                res.send(err);
            } else {
                data = "[" + data + "]";
                res.send(data);
            }
        });
    });
}

module.exports = services;