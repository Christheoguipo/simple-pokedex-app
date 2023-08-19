
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

  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('pokemon-list__item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    button.addEventListener('click', () => showDetails(pokemon));
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  }
})();

// This will display the pokemon details to the console.
function showDetails(pokemon) {
  console.log(pokemon.name);
}

// This loops through and writes all the Pokemons from the repository to the list (their name and height)
pokemonRepository.getAll().forEach(function (pokemon) {

  pokemonRepository.addListItem(pokemon);
});
