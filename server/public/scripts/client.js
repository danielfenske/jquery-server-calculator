console.log('JS');

$(document).ready(onReady);

// // initialize operation variable
// let operation;

function onReady() {
    console.log('JQ');
    
    // runs function to display initial array on DOM
    getCalculationHistory();
    
    // click listener for '=' button
    $('#equalButton').on('click', bundleCalculation);

    // click listener for 'c' button
    $('#clearButton').on('click', clearInputFields);

    // click listeners for operation buttons
    $('#additionButton').on('click', operationAdd);
    $('#subtractionButton').on('click', operationSubtract);
    $('#multiplicationButton').on('click', operationMultiply);
    $('#divisionButton').on('click', operationDivide);

} // end onReady

// operation will change value depending on operation button click
let operationAdd = () => {
    operation = '+';

} // end operationAdd

let operationSubtract = () => {
    operation = '–';
} // end operationSubtract

let operationMultiply = () => {
    operation = '×';
} // end operationSubtract

let operationDivide = () => {
    operation = '÷';
} // end operationSubtract

// Purpose of function: get latest calculation history array from server
let getCalculationHistory = () => {
    console.log('in getCalculationHistory');
    
    $.ajax({
        method: 'GET', // request to server for calculator history
        url: '/calculationHistory', 
        data: ''
    }).then(function(response){
        console.log('Success!', response);
        
        // append calculationHistory to DOM
        renderCalculationHistory(response);
        
    }).catch(function(response){
        console.log('Failure');
        
    })
} // end getCalculations

// Purpose of function: pull input values and 
// send as bundled object to server for calculation
let bundleCalculation = () => {
    console.log('in bundleCalculation');

        // define values taken from input fields
        let firstNumber = Number($('#firstNumber').val());
        let secondNumber = Number($('#secondNumber').val());

if ($('.inputField').val() === '') {
    // will run if either input field is empty - inserted to avoid null in calculations
    alert('Please enter two numbers to receive calculation');
    
    } else if (operation === undefined) {
        // will run if no operation is clicked - inserted to avoid null in calculation
        alert('Please select operation to receive calculation');
        
        } else {
            // making post request to server on /calculation url
            $.ajax({
                method: 'POST', // request to post new object to server
                url: '/calculation',
                data: {

                    // object sent to server
                    bundledObject: {
                        firstNumber: firstNumber,
                        operation: operation,
                        secondNumber: secondNumber,
                    },
                },
            }).then(function(response){
                console.log('Success!', response);

                // call to grab latest calculation history
                getCalculationHistory();
                
            }).catch(function(response){
                console.log('Failure!');
            })
        
    }
} // end bundleCalculation

// Purpose of function: append latest calculation history to DOM
let renderCalculationHistory = (response) => {
    console.log('in renderCalculationHistory');
    
    // empties previous calculation history array
    $('#calculatorHistory').empty();

    // loops through calculation history array and appends each object to display calc + solution
    for (let calculation of response) {
        $('#calculatorHistory').append(`
            <li class="calculationLi">${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} = ${calculation.solution}<hr></li>
        `)
    }
} // end renderCalculationHistory

// Purpose of function: clear input fields when 'C' button is pressed
let clearInputFields = () => {
    console.log('in clearInputFields');

    // clear input fields when 'c' button is clicked
    $('.inputField').val('');

} // end clearInputFields