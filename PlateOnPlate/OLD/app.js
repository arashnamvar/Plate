var express = require("express");
// require('./config/mongoose.js');
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// require('./config/routes.js')(app);

app.use(express.static(path.join(__dirname, "./client")));

var server = app.listen(8000);