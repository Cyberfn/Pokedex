// Seleção de elementos do DOM
const pokemonName = document.querySelector('.pokemon__name'); // Elemento para exibir o nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Elemento para exibir o número do Pokémon
const pokemonImage = document.querySelector('.pokemon__image'); // Elemento para exibir a imagem do Pokémon
const typeElement = document.querySelector('.pokemon__type'); // Elemento para exibir o tipo do Pokémon
const hpElement = document.querySelector('.pokemon__hp'); // Elemento para exibir o HP do Pokémon
const attackElement = document.querySelector('.pokemon__att'); // Elemento para exibir o ataque do Pokémon
const defenseElement = document.querySelector('.pokemon__dff'); // Elemento para exibir a defesa do Pokémon
const speedElement = document.querySelector('.pokemon__spd'); // Elemento para exibir a velocidade do Pokémon
const form = document.querySelector('.form'); // Formulário de busca
const input = document.querySelector('.input__search'); // Input de busca
const buttonPrev = document.querySelector('.btn-prev'); // Botão para Pokémon anterior
const buttonNext = document.querySelector('.btn-next'); // Botão para próximo Pokémon

// Variável que armazena o número do Pokémon atualmente pesquisado
let searchPokemon = 1;

// Função assíncrona para obter dados de um Pokémon da PokeAPI
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verifica se a requisição foi bem-sucedida (status 200)
  if (APIResponse.status === 200) {
    // Converte os dados da resposta para JSON e os retorna
    const data = await APIResponse.json();
    return data;
  }
}

// Função assíncrona para renderizar informações de um Pokémon na interface
const renderPokemon = async (pokemon) => {
  // Atualiza a interface indicando que os dados estão sendo carregados
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Chama a função fetchPokemon para obter os dados do Pokémon
  const data = await fetchPokemon(pokemon);

  if (data) {
    // Se os dados foram obtidos com sucesso, atualiza a interface com as informações do Pokémon
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;

    // Converte os objetos de tipo em uma string para exibição
    const typesString = data.types.map(type => type.type.name).join(', ');

    // Atualiza os elementos de informação com os dados do Pokémon
    typeElement.textContent = `${typesString}`;
    hpElement.textContent = `${data.stats[0].base_stat}`;
    attackElement.textContent = `${data.stats[1].base_stat}`;
    defenseElement.textContent = `${data.stats[2].base_stat}`;
    speedElement.textContent = `${data.stats[5].base_stat}`;

  } else {
    // Se o Pokémon não foi encontrado, exibe uma mensagem indicando isso
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Event listener para o formulário de busca
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Quando o formulário é enviado, chama a função renderPokemon com o valor do input em letras minúsculas
  renderPokemon(input.value.toLowerCase());
});

// Event listener para o botão "Previous"
buttonPrev.addEventListener('click', () => {
  // Se o número do Pokémon atual é maior que 1, diminui o número e chama a função renderPokemon
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Event listener para o botão "Next"
buttonNext.addEventListener('click', () => {
  // Aumenta o número do Pokémon e chama a função renderPokemon
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Chamada inicial para renderizar as informações do primeiro Pokémon quando a página é carregada
renderPokemon(searchPokemon);
