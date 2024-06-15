document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search)
    const pokemonNumber = urlParams.get('number')

    function fetchPokemonDetail(number) {
        const url = `https://pokeapi.co/api/v2/pokemon/${number}`
        return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
            .catch(error => console.error('Error fetching Pokemon details:', error))
    }

    function displayPokemonDetail(pokemon) {
        const pokemonDetail = document.getElementById('pokemonDetail');
        pokemonDetail.innerHTML += `
        <section class="content ${pokemon.type}" id="pokemonDetail">
            <a href="index.html">
                <i class="fa-solid fa-arrow-left-long" style="color: #ffffff;"></i>
            </a>
            <h1 class="name-detail">${pokemon.name}</h1>
            <span class="number-detail">#${pokemon.number}</span>

            <div class="types-detail " >
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="about-detail">
                <h2>About</h2>
                <ul>
                    <li>Height <strong> ${pokemon.height / 10}m</strong></li>
                    <li>Weight <strong> ${(pokemon.weight / 10)} Kg</strong></li>
                    <li>Abilities <strong> ${pokemon.abilities.join(', ')}</strong></li>
                </ul>
            </div>
        </section>
        `
    }

    if (pokemonNumber) {
        fetchPokemonDetail(pokemonNumber).then(displayPokemonDetail)
    }
});
