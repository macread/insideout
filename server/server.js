//npm i express dotenv passport passport-auth0 express-session massive
// to install all the server dependencies

//set server parts first, then test to make sure it works.
//next, if using authentication, set up passport 

//require what we need
require('dotenv').config();
const express = require('express') 
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , controller = require('./controller');

//deconstruct the data from the .env file
const {
    SERVER_PORT,
    CONNECTION_STRING
} = process.env;


const app = express(); //server

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

//

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
});



app.delete('/api/employee/:id', controller.deleteEmployee)
app.get('/api/employee/:id', controller.getEmployee);
app.get('/api/employees/', controller.getEmployees);
app.post('/api/employee', controller.addEmployee);
app.put('/api/employee', controller.updateEmployee);

//server
//get that server going 
app.listen(SERVER_PORT, () => {
    console.log('Listening on port ', SERVER_PORT);
})