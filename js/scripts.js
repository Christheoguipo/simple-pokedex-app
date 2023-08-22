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
    button.classList.add('pokemon-button');
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
          name: String(item.name).toUpperCase(),
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

// Modal IIFE
let modal = (function () {
  let modalContainer = document.querySelector('#modal-container');

  let dialogPromiseReject; // This can be set later, by showDialog

  function showModal(pokemon) {

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // we only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  })

  // function showDialog(title, text) {
  //   showModal(title, text);

  //   // We want to add a confirm and cancel button to the modal
  //   let modal = modalContainer.querySelector('.modal');

  //   let confirmButton = document.createElement('button');
  //   confirmButton.classList.add('modal-confirm');
  //   confirmButton.innerText = 'Confirm';

  //   let cancelButton = document.createElement('button');
  //   cancelButton.classList.add('modal-cancel');
  //   cancelButton.innerText = 'Cancel';

  //   modal.appendChild(confirmButton);
  //   modal.appendChild(cancelButton);

  //   // We want to focus the confirmButton so that the user can simply press Enter
  //   confirmButton.focus();

  //   // Return a promise that resolves when confirmed, else rejects    
  //   return new Promise((resolve, reject) => {
  //     cancelButton.addEventListener('click', hideModal);

  //     confirmButton.addEventListener('click', () => {
  //       dialogPromiseReject = null; // Reset this
  //       hideModal();
  //       resolve();
  //     });
  //     //This can be used to reject from other functions
  //     dialogPromiseReject = reject;
  //   }) 
  // }

  return {
    showModal: showModal,
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
    modal.showModal(pokemon);
  });
}
