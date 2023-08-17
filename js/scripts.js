
// This IIFE wraps the pokemonList to avoid any accidental changes 
let pokemonRepository = (function () {

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

  function add(item) {
    pokemonList.push(item);
  }

  function getAll() {
      return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  } 
})();

let bigPokemon = '';
let bigPokemonClass = '';

// This loops through and writes all the Pokemons from the repository to the list (their name and height)
pokemonRepository.getAll().forEach(function (pokemon) {

  // This highlights big pokemons (height > 2.0)  
  if (pokemon.height > 2.0) {
    bigPokemon = '- Wow, that\'s big!'
    bigPokemonClass = 'class=pokemon-big';
  }

  document.write(`<div ${bigPokemonClass}>${pokemon.name} (${pokemon.height}) ${bigPokemon} </div>`);

  bigPokemon = '';
  bigPokemonClass = '';
});




function divide(dividend, divisor) {
  if (divisor === 0) {
    return 'You\'re trying to divide by zero.';
  } else {
    return dividend / divisor;
  }
}

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));
