console.log('JS');

$(document).ready(onReady);

// // initialize operation variable
let operation = '';
let firstNumber = '';
let secondNumber = '';

function onReady() {
    console.log('JQ');
    
    // runs function to display initial array on DOM
    getCalculationHistory();
    
    // click listener for '=' button
    $('#equalButton').on('click', bundleCalculation);

    // click listener for 'c' button
    $('#clearButton').on('click', resetEquationVariables);

    // click listener for operation buttons
    $('.operationButton').on('click', handleoperation);

    // click listener for number buttons
    $('.numberButton').on('click', handleNumber);

} // end onReady

function renderNumber() {
    console.log('in renderNumber');
    
    if (operation === '') {
        $('.inputField').val(firstNumber);
    } else if (operation != '') {
        clearInputField();

        $('.inputField').val(secondNumber);
    }
} // end renderNumber

function handleoperation() {
    console.log('in handleoperation', $(this).data().operation);
    
    operation = $(this).data().operation
} // end handleoperation

function handleNumber() {
    console.log('in handleNumber', String($(this).data().number));
    
    let buttonPushed = String($(this).data().number);

    if (operation === '') {
        firstNumber += buttonPushed;
        renderNumber();
    } else {
        secondNumber += buttonPushed;
        renderNumber();
    }
    
    console.log('numberOne', firstNumber);
    console.log('numberTwo', secondNumber);

    
} // end handleNumber

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

        // reset equation variables
        resetEquationVariables();
        
    }).catch(function(response){
        console.log('Failure');
        
    })
} // end getCalculations

// Purpose of function: pull input values and 
// send as bundled object to server for calculation
function bundleCalculation(){
    console.log('in bundleCalculation');
if (firstNumber === '') {
    // will run if no operation is clicked - inserted to avoid null in calculation
    alert('Please enter first number to start calculation');
  }  else if (operation === '') {
        // will run if no operation is clicked - inserted to avoid null in calculation
        alert('Please select operation to receive calculation');
        
        } else if (secondNumber === '') {
            // will run if either input field is empty - inserted to avoid null in calculations
            alert('Please enter second number to receive calculation');
            
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

// Purpose of function: append latest calculation history to DOM
function renderCalculationHistory (response){
    console.log('in renderCalculationHistory');
    
    // empties previous calculation history array
    $('#calculatorHistory').empty();

    // loops through calculation history array and appends each object to display calc + solution
    for (let calculation of response) {
        $('#calculatorHistory').append(`
            <li class="calculationLi">${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} = ${calculation.solution}<hr class="notesLine"/></li>
        `)
    }
} // end renderCalculationHistory

let getLastSolution = () => {
    console.log('in getLastSolution');
    
    $.ajax({
        method: 'GET', // request to server for calculator history
        url: '/solution', 
        data: ''
    }).then(function(response){
        console.log('Success!', response);
        
        renderSolution(response);

    }).catch(function(response){
        console.log('Failure');
        
    })
} // end getLastSolution

let renderSolution = (response) => {
    console.log('in renderSolution', response);
    
    let responseConvertedToNumber = Number(response);
    
    // empties previous calculation solution
    $('#calculatorSolution').empty();

    // render last solution to DOM
   $('#calculatorSolution').append(`<li class="solutionLi">${responseConvertedToNumber}</li>`)
} // end renderSolution

// Purpose of function: clear input fields when 'C' button is pressed
function clearInputField () {
    console.log('in clearInputField');

    // clear input field
    $('.inputField').val('');

} // end clearInputField

function resetEquationVariables () {
    console.log('in resetEquationVariables');
    
    // clear input fields when 'c' button is clicked
    $('.inputField').val('');

    // resets global equation variables
    operation = '';
    firstNumber = '';
    secondNumber = '';

} // end resetEquationVariables

function renderSolution (response) {
    console.log('in renderSolution');
    
    let answer = response[response.length-1].solution;

    $('.inputField').val(answer);
} // end renderSolution