var search = document.getElementById('search'); 
var btn = document.getElementById('btn');
var box = document.getElementById('box-2'); 
//console.log(sessionStorage.clear());
// console.log(sessionStorage.getItem('namaPokemon'));


function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var data = JSON.parse(sessionStorage.getItem('namaPokemon')) || [];
function catchPokemon(pokemon, nilai){
	if (!data.includes(pokemon)) {
		if (nilai != 5) {
			var a = showAlert('Click Again! Jangan Menyerah','#FE1212');
			clearInterval(a);
		}else{
			data.push(pokemon);
			sessionStorage.setItem('namaPokemon',JSON.stringify(data));
			clearInterval(a);
			a = showAlert('<i class="fa fa-circle-check"></i>&nbsp; Pokemon Has Been Catch!','#04B10C');
		}
	}else{
		a = showAlert('Pokemon Telah Tertangkap','#363639');
		clearInterval(a);
	}
}

function showAlert(kalimat,color){
	var alert = document.getElementById('alert'); 
	alert.style.transition = '1s';
	alert.style.transform = 'translateX(0%)';
	alert.style.display = 'flex';
	alert.innerHTML = kalimat;
	alert.style.backgroundColor = color;
	setInterval(hideAlert,3000);
}
function hideAlert(){
	var alert = document.getElementById('alert'); 
	alert.style.transition = '2s';
	alert.style.transform = 'translateX(100%)';
	alert.style.display = 'none';
}

function showModal(pokemonData) {

	let color;
	// console.log(pokemonData);
	fetch(pokemonData['species'].url)
	.then(response=>{
		return response.json();
	}).then(pokemonData2=>{

		color = pokemonData2['color'].name;


		let modalBox = document.getElementById('modal-box');  
		let modalClose = document.getElementById('btn-close');
		let modalBody = document.getElementById('modal-body');
		let modalDialog = document.getElementById("modal-dialog");
		let btnCatch = document.getElementById("btnCatch");

		modalBox.style.transform = "scale(1)";


		modalDialog.style.background = `linear-gradient(${color},#F9F9F9,#F3F2F2,#F9F9F9)`;
		let img2 = document.createElement("img");

		// img2.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated'].front_shiny;
		img2.src = pokemonData['sprites']['other']['official-artwork'].front_default;


		modalBody.innerHTML = ""; 
		modalBody.appendChild(img2);


		let boxDetail = document.createElement("div");
		boxDetail.setAttribute('class','box-detail');

		let name = document.createElement("h5");
		name.innerHTML = pokemonData['name'];


		let abilities = document.createElement("p");
		abilities.setAttribute('align','center');
		abilities.innerHTML = 'Abilities';

		let boxAbility = document.createElement("div");
		boxAbility.setAttribute('class','boxAbility');

		let element = document.createElement("p");
		element.setAttribute('align','center');
		element.innerHTML = "Stats";


		let cover = document.createElement("div");
		cover.setAttribute('class','cover');
		for (var i in pokemonData['stats']) {			

			let bar = document.createElement("div");
			bar.setAttribute('class','bar');

			if (color == 'white' ) {
				color = '#B504FF';
			}else if(color == 'yellow'){
				bar.style.color	= '#FE3312';
			}

			let coverBar = document.createElement("div");
			coverBar.setAttribute('class','cover-bar');

			let statsName = document.createElement("p"); 
			statsName.setAttribute('align','right');
			statsName.style.width = '110px';
			statsName.innerHTML =pokemonData['stats'][i]['stat']['name'];


			bar.innerHTML = pokemonData['stats'][i]['base_stat'];
			bar.style.background = color;
			bar.style.width = `${pokemonData['stats'][i]['base_stat']}px`;

			coverBar.appendChild(statsName); 
			coverBar.appendChild(bar);
			cover.appendChild(coverBar);
		}



		boxDetail.appendChild(name);
		boxDetail.appendChild(abilities);

		for (var i in pokemonData['abilities']) {
			let abilitiesObject = document.createElement("p");
			abilitiesObject.setAttribute('align','center');
			abilitiesObject.setAttribute('class','abilitiesObject');

			abilitiesObject.innerHTML = pokemonData['abilities'][i]['ability'].name;
			if (color == 'white' ) {
				color = '#B504FF';
			}else if(color == 'yellow'){
				abilitiesObject.style.color	= '#FE3312';
			}
			abilitiesObject.style.background = color;
			boxAbility.appendChild(abilitiesObject);
		}
		boxDetail.appendChild(boxAbility); 
		boxDetail.appendChild(element);
		boxDetail.appendChild(cover);

		modalBody.appendChild(boxDetail);


		modalClose.addEventListener("click", function () {
			modalBox.style.transition = "0.3s";
			modalBox.style.transform = "scale(0)";
		});

		btnCatch.addEventListener("click",function(){
			let nilai = getRndInteger(0,5);
			catchPokemon(pokemonData['name'],nilai);
		});




	}).catch(error=>{
		console.log("Error"+error.message);
	});
}

function fetchPokemon2() {
	let min = getRndInteger(0,500); 

	fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50`)
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


				var	pokemonImage = pokemonData2['sprites']['other']['official-artwork'].front_default;

				let card = document.createElement("div");
				card.setAttribute('class','card-custom'); 

				let img = document.createElement('img');
				img.setAttribute('id','img');

				let name = document.createElement("h4");
				name.setAttribute('id','name');

				let width = document.createElement("p"); 

				let height = document.createElement("p"); 

				let h5 = document.createElement('h5');

				let btn = document.createElement("div");
				btn.setAttribute('class','btn-detail'); 
				btn.setAttribute('id','btn-detail'); 



				img.src = pokemonImage; 

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

				btn.addEventListener('click',function(){
					showModal(pokemonData2);
				});



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

					var	pokemonImage = pokemonData2['sprites']['other']['official-artwork'].front_default;
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
					btn.setAttribute('id','btn-detail');  

					img.src = pokemonImage;

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

					btn.addEventListener('click',function(){
						showModal(pokemonData2);
					});


				}).catch(error =>{
					console.log('Error : ',error.message);
				})

			}
		}    
	}).catch(error =>{
		console.log('Error : ',error.message);
	}) 
}



fetchPokemon2();


btn.addEventListener('click',function(){
	if (search.value != null || search.value != '') { 
		fetchPokemon(search.value); 
		search.value='';
	}
});
