const path = require('path');


//Router listerners
var router = function (app) {

    app.get('/write-restaurant', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + '/../client/write-restaurant.html'));
    });

    app.get('/browse-database', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + '/../client/browse-database.html'));
    });
    app.get('/', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + '/../client/index.html'));
    });
}

module.exports = router;