console.log('JS');

$(document).ready(onReady);

let operation;

function onReady() {
    console.log('JQ');
    
    // initiate calculation on '=' click
    $('#equalButton').on('click', bundleCalculation);

    $('#additionButton').on('click', operationAdd)
    $('#subtractionButton').on('click', operationSubtract)
    $('#multiplicationButton').on('click', operationMultiply)
    $('#divisionButton').on('click', operationDivide)

} // end onReady

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

let bundleCalculation = () => {
    console.log('in bundleCalculation');

        // define values taken from input fields
        let firstNumber = Number($('#firstNumber').val());
        let secondNumber = Number($('#secondNumber').val());

    // making post request to server on /calculation url
    $.ajax({
        method: 'POST', // type of request
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

        renderCalculationHistory(response);
        
    }).catch(function(response){
        console.log('Failure!');
        
    })
    
} // end bundleCalculation

let renderCalculationHistory = (response) => {
    console.log('in renderCalculationHistory');
    
    $('#calculatorHistory').empty();

    for (let calculation of response) {
        $('#calculatorHistory').append(`
            <li>${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} = ${calculation.solution}</li>
        `)
    }
} // end renderCalculationHistory