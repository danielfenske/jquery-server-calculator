console.log('JS');

$(document).ready(onReady);


function onReady() {
    console.log('JQ');
    
    // initiate calculation on '=' click
    $('#equalButton').on('click', bundleCalculation);
} // end onReady

let bundleCalculation = () => {
    console.log('in bundleCalculation');

        // define values taken from input fields
        let firstNumber = Number($('#firstNumber').val());
        let operation = 'add';
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
        
    }).catch(function(response){
        console.log('Failure!');
        
    })
    
} // end bundleCalculation

