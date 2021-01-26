//Value
//1, true, "hello", function(){}

//Variable

var hello; //output undefined

let foo = "Hello World"  //can change the variable's input

const bar = "Hello World"  // cannot re-assign input after initialization

//const API_KEY = ""
//const PI = 3.14

const car = {model:"Porsche", type:"Sport"}  //logic error
car.model = "BMW"


//Primitive Values - Reference Values

//primitive values
// - number
// - string
// - boolean
// - undefined
// - null
// - symbol

//reference values
// - objects
// - arrays
// - functions

let number = 30
let isNUmber = true
let text = "Hello"
let empty = null

let person = {name:"John"}  // points the related fields memory address

let name = "Mehmet"
let displayName = name  // let displayName = "Mehmet"

name = "Ahmet"  // does not affect displayName value

console.log(name)
console.log(displayName)

// araba => stores the memory address something like 101110110
let araba = {  
    name:"Porsche",
    type:"Sport"
}

let anotherCar = araba  //poiting at the same address

anotherCar.name = "Mercedes"  //because of pointing at the same address, name changed for both variables

console.log(araba.name)
console.log(anotherCar.name)


//Expression(creates value)
let a = 5
let b = 3 + 5

//Statement
if(3 > 5){
    console.log("Operation")
}

//Arithmatic Operators
let plus = 5 + 6
let mult = 3 * 5
// +, -, *, /, %, ++, --, **

let total = 8
total = total + 1  // total++

let increamentAfter = total++  // a = 8, toplam = 9
let  increamentBefore = ++total  // b = 9, toplam = 9

//Assignment Operators
// +=, -=
let x = 5
x += 3  // x = x + 3

let txt = "Hello" + " " + "World"

//Comparison Operators
// <, >, ==, !=, !==
// === equal value and equal type
// ? ternary

3 == "3"  // returns true because values are equal
3 === "3"  // returns false, because type does not satisfy

let age = 30
let isOld = age > 90 ? "Yes": "No"


//Logical Operators
// &&, ||, !(not)

console.log((3 > 2) && (5 > 4))  // true && true

const sample = 3 && 5 && 1 && 0 && 2
console.log(sample) // returns 0

const sample1 = 0 || false || undefined || 5 || null
console.log(sample1) // returns 5

//optional chaining
const firstPerson = person?.name?.firstName

let isOpen = true
function toggle(){
    isOpen = !isOpen 
}

const name1 = "John"
// if(!!name1) checks whether there is a name or not