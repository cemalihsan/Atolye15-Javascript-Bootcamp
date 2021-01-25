if( 3 > 5){
    console.log("3 greater than 5")
}
else{
    console.log("3 is smaller than 5")
}

function logTruthiness(val){
    if(val){
        console.log("Truthy")
    }
    else{
        console.log("Falsy")
    }
}

logTruthiness(true)  //true
logTruthiness({})  //true
logTruthiness([])  //true
logTruthiness("Txt") // true
logTruthiness(3.14)  //true
logTruthiness(new Date())  //true

logTruthiness(false)  //false
logTruthiness(null)  //false
logTruthiness(NaN)  //false
logTruthiness("")  // false
logTruthiness(0)  //false


const getFee = function(){
    return isMember ? "2$" : "10$"
}


//Switch Case

let price = 1

switch(price){
    case 1:
        alert("So cheap")
        break
    case 2:
        alert("Affordable")
        break
    case 3:
        alert("Too expensive")
        break
    default:
        alert("Not expected")
}
