//1. get the parent

let mainTitle = document.querySelector("#main-title")
let parentOfTitle = mainTitle.parentNode
console.log(parentOfTitle)

//2. get siblings

let nextSibling = mainTitle.nextElementSibling
let previousSibling = mainTitle.previousElementSibling
console.log(nextSibling, previousSibling)

//3. get the child
let noteContainer = document.querySelector("#note-container")
let firstChiledOfNote = noteContainer.firstElementChild
console.log(firstChiledOfNote)

let allChildren = noteContainer.childNodes  //bring text(spaces until the next element) and all children
console.log(allChildren)