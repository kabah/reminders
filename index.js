//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Configuration
mongoose.connect('mongodb://localhost/reminders');
process.on('exit', function() { mongoose.disconnect() }); //Shutdown Mongoose correctly
app.set("view engine", "ejs"); //sets view engine to ejs
app.use(bodyParser.json()); //allows for paramerters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public')); // looks for assets like stylesheets in a 'public' folder
const port = 3000; // define a port to listen on

//Controllers
const remindersController = require(".controllers/remindersController.js");

//Routes
app.get("/reminders", remindersController.index);
app.get("/reminders/new", remindersController.new);
app.post("/reminders", remindersController.create);

//Start server
app.listen(port, function() {
	console.log("app is running on port: ", port);
});