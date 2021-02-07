//Mouse Events
/*
mousedown
mouseup
dbclick
click
mousemove
mouseover/mouseout
*/ 

window.addEventListener("load", function(){  //dom un oluştuğundan emin olmak için callback yapılıyor, yüklenmesini bekliyor
    //const btn = document.querySelector("button")

    /*btn.addEventListener("click", function(e){
        alert("Button")
    })*/
    
    //alert("page loaded")

    document.addEventListener("mousemove", function(e){
        console.log("movement")
    })
    
    title.addEventListener("mouseenter", function(e){
        console.log("Over Title")
    })

    document.addEventListener("keydown", function(e){
        if(e.keyCode === 13){
            console.log("Enter")
        }else{
            console.log("Another button") 
        }
       
    })

    title.addEventListener("click",function(e){
        console.log("Title")
    })

    const insideBtn = document.querySelector("#inside")

    insideBtn.addEventListener("click", function(e){
        e.stopPropagation()  //stops back propagation and let the button function execute
        console.log("inside button")
    })

    const link = document.querySelector("a")
    link.addEventListener("click", function(e){
        e.preventDefault()
        alert("Link")
    })

})

