
//get the elements from the DOM
const searchButton = document.getElementById('search-button');
const pokemonContainer = document.getElementById('pokemon-details');



//fetch the API and make a function to get the data
async function getPokemon(){
    const searchPokemon = document.getElementById('pokemon-input').value.toLowerCase();
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`);
        const data = await response.json();
        
        //clear the previous data
        pokemonContainer.innerHTML = '';
        //create objects to store the data
        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = `This Pokemon is Called ${data.name}`;

        const pokemonType = document.createElement('h3');
        pokemonType.textContent = `This pokemon is a ${data.types[0].type.name} type`;
        if (data.types.length > 1){
            pokemonType.textContent += ` and ${data.types[1].type.name} type`;
        }
        typeChecker(data, pokemonType);
        // cries and sounds 

        const pokemonCryButton = document.createElement('button');
        pokemonCryButton.textContent = 'pokemon sound';
        pokemonCryButton.classList.add('btn', 'btn-primary');
        pokemonCryButton.addEventListener('click', () => {
            const pokemonCry = new Audio(data.cries.latest);
            pokemonCry.volume = 0.2;
            pokemonCry.play();
        });

        //append the child elements inside the div
        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.appendChild(pokemonName);
        pokemonContainer.appendChild(pokemonType);
        pokemonContainer.appendChild(pokemonCryButton);

        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

searchButton.addEventListener('click', getPokemon);


function typeChecker(data, pokemonType){
    if (data.types[0].type.name === 'fire'){
        pokemonType.style.color = 'red';
    }
    else if (data.types[0].type.name === 'water'){
        pokemonType.style.color = 'blue';
    }
    else if (data.types[0].type.name === 'grass'){
        pokemonType.style.color = 'green';
    }
    else if (data.types[0].type.name === 'electric'){
        pokemonType.style.color = 'yellow';
    }
    else if (data.types[0].type.name === 'poison'){
        pokemonType.style.color = 'purple';
    }
    else if (data.types[0].type.name === 'bug'){
        pokemonType.style.color = 'green';
    }
    else if (data.types[0].type.name === 'normal'){
        pokemonType.style.color = 'black';
    }
    else if (data.types[0].type.name === 'flying'){
        pokemonType.style.color = 'skyblue';
    }
    else if (data.types[0].type.name === 'fighting'){
        pokemonType.style.color = 'brown';
    }
    else if (data.types[0].type.name === 'psychic'){
        pokemonType.style.color = 'pink';
    }
    else if (data.types[0].type.name === 'rock'){
        pokemonType.style.color = 'grey';
    }
    else if (data.types[0].type.name === 'ground'){
        pokemonType.style.color = 'brown';
    }
    else if (data.types[0].type.name === 'ice'){
        pokemonType.style.color = 'lightblue';
    }
    else if (data.types[0].type.name === 'ghost'){
        pokemonType.style.color = 'purple';
    }
    else if (data.types[0].type.name === 'dragon'){
        pokemonType.style.color = 'blue';
    }
    else if (data.types[0].type.name === 'dark'){
        pokemonType.style.color = 'black';
    }
    else if (data.types[0].type.name === 'steel'){
        pokemonType.style.color = 'grey';
    }
    else if (data.types[0].type.name === 'fairy'){
        pokemonType.style.color = 'pink';
    }
    else{
        pokemonType.style.color = 'black';
    }

}









