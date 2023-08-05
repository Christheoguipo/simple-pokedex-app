let pokemonList = [
  {
    name: 'Gengar',
    height: 1.5,
    types: ['Ghost', 'Poison']
  },
  {
    name: 'Dragonite',
    height: 2.2,
    types: ['Dragon', 'Flying']
  },
  {
    name: 'Mankey',
    height: 0.5,
    types: ['Fighting']
  }
];

let bigPokemon = '';
let bigPokemonClass = '';

// This writes all the Pokemons in the list (their name and height)
for (i = 0; i < pokemonList.length; i++) {

  // This highlights big pokemons (height > 2.0)
  if (pokemonList[i].height > 2.0) {
    bigPokemon = '- Wow, that\'s big!'
    bigPokemonClass = 'class=pokemon-big';
  }

  document.write(`<div ${bigPokemonClass}>${pokemonList[i].name} (${pokemonList[i].height}) ${bigPokemon} </div>`);

  bigPokemon = '';
  bigPokemonClass = '';
}
