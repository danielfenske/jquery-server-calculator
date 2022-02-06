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

// initialize calculationHistory array
let calculationHistory = [];

// server sending calculationHistory to client on /calculationHistory url
app.get('/calculationHistory', (req, res) => {
    console.log('Request at /calculationHistory was made');
    
    res.send(calculationHistory);
}); // end get /calculationHistory

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
    res.sendStatus(201);

}); // end post /calculation


// calculate problem given from client
let solveCalculation = (bundledCalculation) =>{
    console.log('in solveCalculation');
    
    // determine which operation was requested to execute proper function
    switch (bundledCalculation.operation) { 
        case '+':
            console.log('addition!');
            bundledCalculation.solution = bundledCalculation.firstNumber + bundledCalculation.secondNumber;
            break;
        case '–':
            console.log('subtraction!');
            bundledCalculation.solution = bundledCalculation.firstNumber - bundledCalculation.secondNumber;
            break;
        case '×':
            console.log('multiplication!');
            bundledCalculation.solution = bundledCalculation.firstNumber * bundledCalculation.secondNumber;
            break;
        case '÷':
            console.log('division!');
            bundledCalculation.solution = bundledCalculation.firstNumber / bundledCalculation.secondNumber;
            break;
        default: 
            console.log('Something is wrong');  
    } // end switch case

} // end solveCalculation





















// start up server 
app.listen(port, function(){
    console.log('listening on port', port);
    
});