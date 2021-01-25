//Function Declaration
function multiply(a,b){
    console.log( a * b )
}

//Function Expression

const addition = function(a,b){
    console.log( a + b )
}

//Arrow function

const arrowFunction = () =>{
    return "Arrow function"
}

multiply(3,5)
addition(3,5)

// IIFE (Immediatley Invoked Function Expressions)
/*
(function carpma(a,b){
    console.log(a * b)
})(3,5)
*/


//Regular Expressions

//RegEx
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
console.log(re.test("a@b.com"))
