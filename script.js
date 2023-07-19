var search = document.getElementById('search'); 
var btn = document.getElementById('btn');
var box = document.getElementById('box-2'); 

fetchPokemon2();


btn.addEventListener('click',function(){
	if (search.value != null || search.value != '') { 
		fetchPokemon(search.value); 
		// search.value = ' ';

	}
});


function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}




function fetchPokemon2() {
	let min = getRndInteger(0,500); 

	fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${min}&limit=50`)
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

				var	pokemonImage = pokemonData2['sprites']['versions']['generation-vi']['omegaruby-alphasapphire'].front_shiny;

				let card = document.createElement("div");
				card.setAttribute('class','card-custom'); 

				let img = document.createElement('img');
				img.setAttribute('id','img');

				let name = document.createElement("h4");
				name.setAttribute('id','name');

				let width = document.createElement("p");
				// width.setAttribute('id','width');

				let height = document.createElement("p");
				// height.setAttribute('id','height');

				let h5 = document.createElement('h5');

				let btn = document.createElement("div");
				btn.setAttribute('class','btn-detail'); 
				


				img.src = pokemonImage;

				img.addEventListener('mouseenter',function(){ 
					img.src = pokemonData2['sprites']['versions']['generation-v']['black-white']['animated'].front_shiny;
				});
				img.addEventListener('mouseleave',function(){ 
					img.src = pokemonImage;
				});

				name.innerHTML = pokemonData.results[i].name;
				height.innerHTML = pokemonData2.height + " cm" ;
				width.innerHTML = pokemonData2.weight + " g" ;
				btn.innerHTML = "See Detail";

				h5.appendChild(width);
				h5.appendChild(height);

				card.appendChild(img);
				card.appendChild(name);
				card.appendChild(h5);
				card.appendChild(btn);

				box.appendChild(card);

				

			}).catch(error =>{
				console.log('Error : ',error.message);
			}) 

		}    
	}).catch(error =>{
		console.log('Error : ',error.message);
	}) 
}

function fetchPokemon(pokemon) {

	box.innerHTML = '';	
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

					var	pokemonImage = pokemonData2['sprites']['versions']['generation-vi']['omegaruby-alphasapphire'].front_shiny;
					if (pokemonImage == null) {
						pokemonImage =  pokemonData2['sprites']['versions']['generation-v']['black-white'].front_default; 
					}
					let card = document.createElement("div");
					card.setAttribute('class','card-custom'); 

					let img = document.createElement('img');
					img.setAttribute('id','img');

					let name = document.createElement("h4");
					name.setAttribute('id','name');

					let width = document.createElement("p");
				// width.setAttribute('id','width');

					let height = document.createElement("p");
				// height.setAttribute('id','height');

					let h5 = document.createElement('h5');

					let btn = document.createElement("div");
					btn.setAttribute('class','btn-detail'); 

					img.src = pokemonImage;

					img.addEventListener('mouseenter',function(){ 
						var temp =  img.src = pokemonData2['sprites']['versions']['generation-v']['black-white']['animated'].front_shiny;
						if (temp == null) {
							img.src = pokemonData2['sprites']['versions']['generation-v']['black-white'].front_shiny;
						}else{
							img.src = pokemonData2['sprites']['versions']['generation-v']['black-white']['animated'].front_shiny;
						}

					});
					img.addEventListener('mouseleave',function(){ 
						img.src = pokemonImage;
					});

					name.innerHTML = pokemonData.results[i].name;
					height.innerHTML = pokemonData2.height + " cm" ;
					width.innerHTML = pokemonData2.weight + " g" ;
					btn.innerHTML = "See Detail";

					h5.appendChild(width);
					h5.appendChild(height);

					card.appendChild(img);
					card.appendChild(name);
					card.appendChild(h5);
					card.appendChild(btn);

					box.appendChild(card);


				}).catch(error =>{
					console.log('Error : ',error.message);
				})

			}
		}    
	}).catch(error =>{
		console.log('Error : ',error.message);
	}) 
}



