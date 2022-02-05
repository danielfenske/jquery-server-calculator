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

// -------------------------------------------------------------------//

// initialize calculationHistory an
let calculationHistory = [{firstNumber: 23, operation: 'add', secondNumber: 1, solution: 4}];


// server receiving request from client on /calculation url
app.post("/calculation", (req, res) => {
    console.log('request', req.body);
    
    // define variables from client post for future calculation
    let firstNumber = Number(req.body.bundledObject.firstNumber);
    let operation = req.body.bundledObject.operation;
    let secondNumber = Number(req.body.bundledObject.secondNumber); 

    // define bundledCalculation object
    let bundledCalculation = {
        firstNumber: firstNumber,
        operation: operation,
        secondNumber: secondNumber,
        solution: null,
    }

    // send bundledCalculation through function to solve calculation
    solveCalculation(bundledCalculation);

    // add bundledCalculation to calculationHistory array
    calculationHistory.push(bundledCalculation);    

    // sends bundledCalculation (with solution) back to server
    res.send(bundledCalculation);

}); // end post /calculation


// calculate problem given from client
let solveCalculation = () =>{
    console.log('in solveCalculation');
        
} // end solveCalculation





















// start up server 
app.listen(port, function(){
    console.log('listening on port', port);
    
});