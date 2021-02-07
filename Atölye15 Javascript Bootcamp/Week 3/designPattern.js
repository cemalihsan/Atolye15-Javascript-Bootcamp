//Module Pattern and Revealing Module
var addToTable = function(){} //can be accessed everywhere

var myApp = (function(){  //private function access
    var yazdir = function(){
        console.log("hello")
    }

    return{
        yazdir: yazdir
    }
})()

console.log(myApp.yazdir())