let pokemons  = [];
let url = 'https://pokeapi.co/api/v2/pokemon';
let urlNext = '';
let urlPrev = '';


const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");

const cardsPokemons = document.getElementById("contenedorPokemons");

mostrarPokemones = (urlIn) => {
    if(urlIn !== undefined){
        url = urlIn;
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        pokemons = data.results;
        urlNext = data.next;
        urlPrev = data.previous;
        let showCard = '<div class="row">';

        for(i=0; i < pokemons.length; i++){
            let pokemon = fetch(pokemons[i].url)
            .then(response => response.json())
            .then(data => {
                let skills = '';
                for(i=0; i<data.abilities.length; i++){
                    //+ (i+1) + '.- ' 
                    skills += 
                        `<span class="badge bg-secondary me-1">`+data.abilities[i].ability.name.toUpperCase()+`</span>`;
                }
                showCard +=
                    `<div class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <div  class="card h-100" style="width: 100%;">
                            <img class="align-self-center" src="`+data.sprites.other['official-artwork'].front_default+`" alt="..." width="50%">
                            <div class='card-body'>
                                <h3 class='card-title fw-light text-center'>`+data.name.toUpperCase()+`</h3>
                                <hr>
                                <span class="badge bg-primary me-1">Tamaño: `+data.height+`0 cm</span>
                                <span class="badge bg-info me-1" style="color: #fff;">Peso: `+data.weight+` Kg</span><br><br>
                                <h6 class="fst-italic">Habilidades: </h6>
                                <li class='list-group-item'>
                                `+ skills +`
                                </li>
                            </div>
                        </div>
                    </div>`;

                if(cardsPokemons !== null){
                    cardsPokemons.innerHTML = showCard;
                }
            });
        }

        if(data.previous === null){
            btnPrevious.setAttribute('style', 'display:none');
        } else {
            btnNext.setAttribute('style', 'display:inline');
            btnPrevious.setAttribute('style', 'display:inline');
        }

    });

}

function next() {
    mostrarPokemones(urlNext);
}

function previous (){
    mostrarPokemones(urlPrev);
}