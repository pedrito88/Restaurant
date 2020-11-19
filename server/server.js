const express = require('express');
const app = express();
const path = require('path');


const bodyparser = require('body-parser');
app.use("/client", express.static(path.resolve(__dirname + "/../client")));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

//make server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 6200;
//Router Listeners
var router = require("./router.js");
router(app);

//Service Listerners
var services = require("./services.js");
services(app);

//App listener
server = app.listen(port, function(err){
if(err){
    throw err;
}
    console.log("Listening on port " + port);
});
