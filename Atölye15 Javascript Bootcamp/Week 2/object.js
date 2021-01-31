//Objects

//let user = {} //object literal
//let user = new Object() //constructor syntax

let user = {
    name:"John",
    age:30,
    "his hobbies": []
}

user.surname = "Doe"

console.log(user.name)
console.log(user.surname)
console.log(user["his hobbies"])

//for in
for(element in user){
    console.log(element, user[element])
}

//THIS

//1.Implicit this
const user1 = {
    name:"John",
    age:30,
    greet(){
        console.log("Hello my name is " + this.name)
    },
    mother:{
        name:"Mary",
        greet(){
            console.log("Hello my name is " + this.name)
        }
    }
}

user1.greet() //John
user1.mother.greet() //Mary(this looks before the coma in function call)


//2.Explicit this

function greet1(l1, l2, l3){
    console.log("Hello my name is " + this.name + ". I know " + l1 + "," + l2 + "," + l3)
}

const user2 = {
    name:"Joe",
    age:30
}

//call
greet1.call(user2, "JS", "Python", "C")

//bind
let myFunc = greet1.bind(user2, "JS", "Python", "C")
myFunc()

//apply
greet1.apply(user2, ["JS", "Python", "C"])


//3. new Binding

function newUser(name, age){
    this.name = name
    this.age = age
}

const person = new newUser("Cemal", 24)

console.log(person.name + "," + person.age)


//4. Lexical Binding
//Without use of bind function, local func. can not reach to the this.

const player = {
    name:"JJ",
    age: 27,
    languages:["JS", "Py"],
    greeting(){
        const hello = "Hello my name is " + this.name + " and I know"   

        const langs = this.languages.reduce(function(str,lang,i){   
            if(i === this.languages.length - 1){
                return str + "and " + lang
            }
            return str + " " + str
        }.bind(this), "")
        console.log(hello + langs)
    }
}

player.greeting()

//With Arrow Function
//Looks this from the parent which is playerArrow

const playerArrow = {
    name:"JJ",
    age: 27,
    languages:["JS", "Py"],
    greeting(){
        const hello = "Hello my name is " + this.name + " and I know"   

        const langs = this.languages.reduce((str,lang,i) =>{   
            if(i === this.languages.length - 1){
                return str + "and " + lang
            }
            return str + " " + str
        }, "")
        console.log(hello + langs)
    }
}

playerArrow.greeting()


//5. window Binding

window.age=27
function sayAge(){
    //this = window
    console.log("My age is " + this.age)
}

sayAge()