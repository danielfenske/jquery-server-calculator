// require express
// gives us a function 
const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express by calling the function returned above
// function gives us an object
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));

// serve static files in public directory
// folder name is server/public
app.use(express.static('server/public'));

























// start up server 
app.listen(port, function(){
    console.log('listening on port', port);
    
})