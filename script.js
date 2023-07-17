var search = document.getElementById('search');
var ol = document.getElementById('ol');
var btn = document.getElementById('btn');
var box = document.getElementById('box-2');
		fetchPokemon2();
btn.addEventListener('click',function(){
	if (search.value != null || search.value != '') { 
		fetchPokemon(search.value);
	}
});

function fetchPokemon2() {
	ol.innerHTML = '';	

	fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100`)
	.then(response=>{
		return response.json(); 
	})
	.then(pokemonData =>{
		var a = pokemonData.results;  
		for (let i in a) {   
				/* fetch kedua */ 
			fetch(pokemonData.results[i].url)
			.then(response =>{
				return response.json();
			}).then(pokemonData2 => {

				const li = document.createElement('li');  
				li.innerHTML = `<ul><li><img src="${pokemonData2.sprites.front_default}" alt=""></li> <li> ${pokemonData.results[i].name}</li> <li> Height : ${pokemonData2.height } inch</li> <li>Weight : ${pokemonData2.weight } g</li></ul>`;  
				ol.appendChild(li); 
			}).catch(error =>{
				console.log('Error : ',error.message);
			}) 

		}    
	}).catch(error =>{
		console.log('Error : ',error.message);
	}) 
}

function fetchPokemon(pokemon) {
	ol.innerHTML = '';	

	fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281`)
	.then(response=>{
		return response.json(); 
	})
	.then(pokemonData =>{
		var a = pokemonData.results;  
		for (let i in a) { 
			if ( a[i].name.toLowerCase().includes(pokemon.toLowerCase() ) ) {

				/* fetch kedua */ 
				fetch(pokemonData.results[i].url)
				.then(response =>{
					return response.json();
				}).then(pokemonData2 => {

					const li = document.createElement('li');  
					li.innerHTML = `<ul><li><img src="${pokemonData2.sprites.front_default}" alt=""></li> <li> ${pokemonData.results[i].name}</li> <li> Height : ${pokemonData2.height } inch</li> <li>Weight : ${pokemonData2.weight } g</li></ul>`;  
					ol.appendChild(li); 
				}).catch(error =>{
					console.log('Error : ',error.message);
				}) 
			}
		}    
	}).catch(error =>{
		console.log('Error : ',error.message);
	}) 
}



