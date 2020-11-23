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

    //delete services 
    app.delete('/delete-record', function (req, res) {
        var data = req.body.data;
        var id = data.id;

        fs.readFile(outputFile, 'utf8', function (err, data) {
            if (err) {
                res.send(err);
            } else {

                var parsedData = JSON.parse(data);
                for (var i = 0; i < parsedData.length; i++) {
                    if (id === parsedData[i].ID) {
                        parsedData.splice(i, 1);
                        break;
                    }
                }

                var dataString = JSON.stringify(parsedData);
                fs.writeFile(outputFile, dataString, function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        data = "[" + dataString + "]";
                        res.send(data);
                    }
                });

                data = "[" + data + "]";
                res.send(data);
            }

        });
    });

    // end of new stuff
}



module.exports = services;
