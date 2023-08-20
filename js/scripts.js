
// This IIFE wraps the pokemonList to avoid any accidental changes 
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(item) {
    pokemonList.push(item);
  }

  function getAll() {
    return pokemonList;
  }

  // This function creates the <li> and <button> for every pokemon on the pokemonList
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

  // This function fetches the list of Pokemons from an api and adds them to the pokemonList
  function loadList() {
    hideShowLoadingMessage();

    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });

      hideShowLoadingMessage();

    }).catch(function (e) {
      hideShowLoadingMessage();
      console.error(e);
    })
  }

  // This function fetches the detail of a pokemon
  function loadDetails(item) {

    hideShowLoadingMessage();

    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;

      hideShowLoadingMessage();
    }).catch(function (e) {
      hideShowLoadingMessage();
      console.error(e);
    });
  }
  
  let loadingMessage = document.querySelector('#message');

  function hideShowLoadingMessage() {
    loadingMessage.classList.toggle('hide');
  }
 
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  // This loops through and calls addListItem for all the Pokemons in the pokemonList
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// This function will display the pokemon details to the console.
function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}
