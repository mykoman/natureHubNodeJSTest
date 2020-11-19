const express = require('express');
const app = express();
const dbconnection = require('./config/db')

//connect to database
dbconnection();


//route connections
app.get('/', require('./route/api/user'))

//run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("The server runs fine"));