// This IIFE wraps the pokemonList to avoid any accidental changes
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(item) {
    pokemonList.push(item);
  }

  function getAll() {
    return pokemonList;
  }

  // This function creates the <li> and <button> for every pokemon on the pokemonList
  function addListItem(pokemon) {
    let unorderedList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-info");
    button.classList.add("btn-block");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemon-modal");

    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    button.addEventListener("click", () => showDetails(pokemon));
  }

  // This function fetches the list of Pokemons from an api and adds them to the pokemonList
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: String(item.name).toUpperCase(),
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This function fetches the detail of a pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function displayDetails(pokemon) {
    // Add the new modal content
    let modalTitle = $("#pokemon-modal-label");
    modalTitle.text(pokemon.name);

    let modalBody = $(".modal-body");

    let imageElement = $("<img></img>");
    imageElement.attr("src", pokemon.imageUrl);

    let pHeightElement = $("<p></p>");
    pHeightElement.text("Height: " + pokemon.height);

    // Convert the Pokemon Types array into string separated with commas and space
    let pokemonTypes = pokemon.types.map((types) => types.type.name).join(", ");
    let pTypesElement = $("<p></p>");
    pTypesElement.text("Types: " + pokemonTypes);

    modalBody.append(imageElement);
    modalBody.append(pHeightElement);
    modalBody.append(pTypesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    displayDetails: displayDetails,
  };
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
    pokemonRepository.displayDetails(pokemon);
  });
}

$(".modal").on("hidden.bs.modal", () => {
  $("#pokemon-modal-label").empty();
  $(".modal-body").empty();
});
