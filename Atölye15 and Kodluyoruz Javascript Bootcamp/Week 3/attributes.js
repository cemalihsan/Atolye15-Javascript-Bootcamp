// getAttribute, setAttribute and hasAttribute, removeAttribute

const addresses = document.querySelectorAll("input[name='address']")
addresses.forEach(element => {
    const inputElement = element
    const id = inputElement.getAttribute("id")
    const type = inputElement.getAttribute("type")

    
    inputElement.setAttribute("data-read", "yes")
    
    let hasElementId = inputElement.hasAttribute("id")
    console.log(id,type, hasElementId)
});

