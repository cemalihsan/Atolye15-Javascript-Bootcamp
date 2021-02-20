const title = document.querySelector("#main-title")
title.style.color = "red"
title.style.backgroundColor = "black"
//title.setAttribute("style", "font-size: 60px") //overrides all css because of style keyword

title.classList.add("newclass")
console.log(title.classList)

title.classList.remove("mytitle")
console.log(title.classList)

title.classList.contains("mytitle")