const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 9
let offset = 0;

function convertPokemonToLi(pokemon) {    
    return `
        <li id="${pokemon.id}" class="pokemon ${pokemon.type}" onclick="openModal(${pokemon.id})">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}"> 
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


const modalViewPokemon = document.getElementById("modal-view-pokemon")
let modalHeader = document.getElementById("modal-header")
let pokemonName = document.getElementById("pokemon-name")
let pokemonId = document.getElementById("pokemon-id")
let pokemonTypes = document.getElementById("pokemon-types")
let pokemonPhoto = document.getElementById("pokemon-photo")
let pokemonHeight= document.getElementById("pokemon-height")
let pokemonWeight = document.getElementById("pokemon-weight")

async function openModal(idPokemon) {
    const pokemon = await pokeApi.getPokemonInfos(idPokemon)
    modalHeader.classList.add(`${pokemon.type}`)
        
    let pokemonNameTextContent = document.createTextNode(pokemon.name)
    pokemonName.appendChild(pokemonNameTextContent)
    
    let pokemonIdTextContent = document.createTextNode(pokemon.id)
    pokemonId.appendChild(pokemonIdTextContent)

    let pokemonTypesTextContent = await pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')
    pokemonTypes.innerHTML += pokemonTypesTextContent

    pokemonPhoto.setAttribute("src", `${pokemon.photo}`)

    let pokemonHeightTextContent = document.createTextNode(pokemon.height)
    pokemonHeight.appendChild(pokemonHeightTextContent)

    let pokemonWeightTextContent = document.createTextNode(pokemon.weight)
    pokemonWeight.appendChild(pokemonWeightTextContent)

    fade.classList.remove("hide")
    modalViewPokemon.classList.remove("hide")
}
  
function closeModal() {
    modalHeader.setAttribute("class", 'modal-header')
    pokemonName.innerHTML = ""
    pokemonId.innerHTML = ""
    pokemonTypes.innerHTML = ""
    pokemonPhoto.setAttribute("src", "")
    pokemonHeight.innerHTML = ""
    pokemonWeight.innerHTML = ""
  
    fade.classList.add("hide")
    modalViewPokemon.classList.add("hide")
}