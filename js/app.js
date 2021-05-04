'use strict';

// DOM Objects
const poke_container = document.getElementById('poke_container');

// Const and Lets
const poke_number = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);


// Functions
const createPokeCard = pokemon => {
    const pokeEl = document.createElement('div');
    pokeEl.classList.add('pokemon');

    const poke_types = pokemon.types.map( el => el.type.name );

    const type = main_types.find( 
        type => poke_types.indexOf(type) > -1 
    );
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokeEl.style.backgroundColor = color;

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt=""\>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h2 class="name">${name}</h2>
            <small class="type">Type: <span>${type}</span> </small>
        </div>
    `;

    pokeEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokeEl);
}


// Fetch
const fetchPokemons = async() => {
    for( let i = 1; i <= poke_number; i++ ) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const res = await fetch(url);
    const pokemon = await res.json();
    createPokeCard(pokemon);
}

// Call Functions
fetchPokemons();