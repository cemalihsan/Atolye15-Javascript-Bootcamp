function foo(){
    var bar = "Declared in foo"
}

foo();

//console.log(bar) 
//Reference error, can not access to the variable

function first(){
    var name = "John"
    console.log(name)
}

function second(){
    var name = "Joe"
    console.log(name)
}

console.log(name)
var name = "Mehmet"
first()
second()
console.log(name)

//OUTPUT: undefined, John, Joe, Mehmet

//SCOPE CHAIN
var name = "Joe"

function logName(){
    console.log(name)
}

logName() //OUTPUT: Joe


//CLOSURE SCOPE
var count = 0

function makeAdder(x){
    return function(y){
        return x + y
    }
}

var add5 = makeAdder(5) // Returns 5 (In oreder to crate closure scope)

count = count + add5(2) // OUTPUT: 7

//OUTPUT: 4 4 4 4
for(var i = 0; i<4; i++){
    setTimeout(function(){
        console.log(i)
    }, 500)
}

//OUTPUT: 0 1 2 3
for(let i = 0; i<4; i++){
    setTimeout(function(){
        console.log(i)
    }, 500)
}

for(var i = 0; i<4; i++){
    (function(sayi){
    setTimeout(function(){
        console.log(sayi)
    }, 500)
    })(i)
}

discountedPrice([100,200,300], 0.5)


//LET is a block scope
function discountedPrice(prices, discount){
    let discounted = []
    for(let i = 0; i < prices.length; i++){
        let discountedPrice = prices[i] * (1 - discount)
        let finalPrice = Math.round(discountedPrice*100) / 100
        discounted.push(finalPrice)
    }

    //console.log(i) //reference error
    //console.log(discountedPrice)
    return discounted
}

//VAR is a function scope
function discountedPrice(prices, discount){
    //HOISTING IN HERE:
    //var discounted = undefined
    //var discountedPrice = undefined
    //var i = undefined
    //var finalPrice = undefined

    var discounted = []
    for(var i = 0; i < prices.length; i++){
        var discountedPrice = prices[i] * (1 - discount)
        var finalPrice = Math.round(discountedPrice*100) / 100
        discounted.push(finalPrice)
    }

    //console.log(i) //3
    //console.log(discountedPrice) //150
    return discounted
}