//1. id, getElementById

let element = document.getElementById("main-title")

//2. name, getElementByName

let addressElement = document.getElementsByName("address") //returns NodeList[..,..]

//3.tag name, getElementByTagName

let pElement = document.getElementsByTagName("p") //returns HTMLCollection

//4. class name, getElementByClassName

let bgRedElement = document.getElementsByClassName("bg-red") //returns HTMLCollection

//5. querySelector and querySelectorAll

let qElement = document.querySelector("#main-title")

let addressElementQ = document.querySelectorAll("input[name='address']")