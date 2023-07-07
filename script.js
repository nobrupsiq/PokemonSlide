const slideWapper = document.querySelector('.swiper-wrapper');
const arrayPokemon = []
const arrayPokemonLoaded = []
let count = 1
let card_n = 0

createCards(150)

function fetchPokemon() {
  const url = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`

  for(let i = 1; i <= 150; i++)
    arrayPokemon.push(fetch(url(i)).then(response => response.json()));

    Promise.all(arrayPokemon).then(poke=>{
        arrayPokemonLoaded.push(...poke)
        pushPokemonsQtds(5)
        observe()
    })
}

fetchPokemon()

function createCards(card_quantity){
    for(let i = 0 ; i < card_quantity ; i++){
        let card = document.createElement('div');
        card.classList.add('swiper-slide')
        slideWapper.appendChild(card)
    }
}


function pushPokemon(){
    let c = Array.from(slideWapper.children)[card_n]
    let pokemon_class = arrayPokemonLoaded[card_n].types[0].type.name
    c.classList.add('pokemon-classe-'+pokemon_class)
    c.innerHTML = `
        <img src='https://nobrupsiq.github.io/pokemongif/${arrayPokemonLoaded[card_n].name}.gif'/>
        <p class='title-name'>${arrayPokemonLoaded[card_n].name}</p>
        <span class='subtitle'>${arrayPokemonLoaded[card_n].types.map(typeInfo => typeInfo.type.name).join(' & ')}</span>
    `
    ++card_n
}

function pushPokemonsQtds(n){
    for(let i = 0 ; i < n ; i++){
        pushPokemon()
    }
}

function observe(){
    function onMovement(){
        let slide_active = document.querySelector(".swiper-slide-active")
        let slide_all = Array.from(document.querySelectorAll(".swiper-slide"))
        let slide_pos = slide_all.indexOf(slide_active)
        if(card_n - slide_pos <= 5) pushPokemonsQtds(10)
    }
    let observer = new MutationObserver(onMovement)
    observer.observe(slideWapper, {attributes:true})
}

window.addEventListener('keydown', e=>{
    if(e.key == "ArrowLeft") swiper.slidePrev()
    if(e.key == "ArrowRight") swiper.slideNext()
})
