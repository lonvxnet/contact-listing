'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  path = require('path');


app.use(express.static(path.join(__dirname,"../build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('../app/routes/contacts.route.js'); //importing route
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on port ' + port);