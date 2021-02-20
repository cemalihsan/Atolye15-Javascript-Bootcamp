const petsModule = (function(){
    const _data = [
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            soundText: "Bark - type b"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
        }
    ];
    const $tbodyEl = document.querySelector("tbody");
    const $buttons= document.querySelectorAll("button");
    const $rows = $tbodyEl.getElementsByTagName("tr")

    const getButtons = function(){
        return document.querySelectorAll("button");
    }

    const getImages = function(){
        return document.getElementsByClassName("pet-image")
    }

    const createPetElement = function(pet){
        return "<tr><td><img class='pet-image' src='"+pet.image+"' /></td><td>"+pet.name+"</td><td>"+pet.type+"</td><td><button id='soundButton' data-sound='"+pet.sound+"'>"+pet.soundText+"</button></td></tr>"
    };

    const addToTable = function(content){
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function(){
        for(let i=0; i< _data.length; i++){
            addToTable(createPetElement(_data[i]));
        }
    }

    const playVoice = function(){
        document.addEventListener("keydown", function(e){
            if(e.keyCode == 66){
                document.getElementById('bark').play()
            }
            if(e.keyCode == 77){
                document.getElementById('meow').play()
            }
        })
    }

    const clickRowElement = function(){
        let main_image = document.getElementById("main_image")
        for(let i = 0; i < $rows.length; i++){
            $rows[i].addEventListener('click', function(e){
                //$rows[i].style.backgroundColor = "gray"
                $rows[i].classList.add('selectedRow')
                main_image.src = $rows[i].querySelector('td > img').src

            })

        }
    }

    /*
    const profileImgClicked = function(){
        let images = getImages()
        let main_image = document.getElementById("main_image")
        for(let i = 0; i < images.length; i++){
            images[i].addEventListener('click', function(e){
                main_image.src = images[i].src
            })
        }

    }
    */
    const bindEvents = function(){
        const buttons = getButtons();
        for(let i= 0; i< buttons.length; i++){
            buttons[i].addEventListener("click", function(event){
                event.stopPropagation()
                const soundId = this.dataset.sound;
                const soundElement = document.getElementById(soundId);
                if(soundElement){
                    soundElement.play();
                }
            });
        }
    }

    const init = function(){
        putPetsInHtml();
        bindEvents();
        playVoice();
        clickRowElement();
        //profileImgClicked();
    }

    return {
        init: init
    }
})();