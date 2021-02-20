/*8 karakterden daha uzun olan kelimeleri sarı background, beyaz text color*/

const paragraf = document.querySelector("p")
let newParagraf = ""
const words = paragraf.innerText.split(" ")

for(let i = 0; i <words.length; i++){
    const word = words[i]

    if(word.length > 8){
        newParagraf += "<span style='background-color: yellow; color: black'>"+ word +"</span>"
    }
    else{
        newParagraf += word
    }

    newParagraf += " "
}

paragraf.innerHTML = newParagraf


//soru işareti thinking emoji, virgülleri suprise ile

let emojiParagraph = "";
for(let i=0; i < words.length; i++){
    const word = words[i];
    const withThinking = word.replace("?", "🤔");
    const withAstonishing = withThinking.replace("!", "😲");
    emojiParagraph += withAstonishing;
    emojiParagraph += " ";
}
paragraf.innerHTML = emojiParagraph;

//Word count

const wordCountEl = document.createElement("div")
wordCountEl.innerText = words.length + " words"
document.body.insertBefore(wordCountEl,document.querySelector("p"))

//add link after paragraf

const link = document.createElement("a")
link.setAttribute("href", "http://tr.lipsum.com")
link.innerText = "Go to source"
document.body.appendChild(link)