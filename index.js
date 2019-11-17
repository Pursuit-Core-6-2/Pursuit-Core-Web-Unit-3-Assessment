let apiKey = `http://localhost:3030`;

document.addEventListener('DOMContentLoaded', () => {
	loadSelectBox();
	let submitButton = document.querySelector('button');
	submitButton.addEventListener('click', getSightings);


})

async function loadSelectBox(){
	let selectBox = document.querySelector('select');
	let allTag = document.createElement('option');
	allTag.innerText = 'All';
	allTag.value = 0;
	selectBox.appendChild(allTag);
	let response = await axios.get(`${apiKey}/researchers`);
	console.log(response.data.payload);
	for(let i = 0; i < response.data.payload.length; i++){
		let option = document.createElement('option');
		option.innerText = response.data.payload[i].name;
		option.value = response.data.payload[i].id;
		selectBox.appendChild(option);
	};
}

async function getSightings(){
	let selectBox = document.querySelector('select');
	let userId =  parseInt(selectBox.options[selectBox.selectedIndex].value);
	let sightings;
	if(userId === 0){
		sightings = await axios.get(`${apiKey}/sightings`);
		sightings = sightings.data.payload;
	}
	else{
		response = await axios.get(`${apiKey}/sightings/researchers/${userId}`);
		sightings = response.data.payload;
	};
	let resultsBox = document.querySelector('.results');
		while(resultsBox.firstChild){
			resultsBox.removeChild(resultsBox.firstChild);
		}

	for(let i = 0 ; i < sightings.length; i++){
		let researcher = await axios.get(`${apiKey}/researchers/${sightings[i].researcher_id}`);
		console.log(researcher);
		let researcherText = `${researcher.data.payload[0].name} who is a ${researcher.data.payload[0].job_title}`;
		console.log(researcherText);
		let species = await axios.get(`${apiKey}/species/${sightings[i].species_id}`);
		let speciesText = ` saw a ${species.data.payload[0].name}`;
		let habitat = await axios.get(`${apiKey}/habitats/${sightings[i].habitat_id}`);
		let habitatText = ` in ${habitat.data.payload[0].category}`;
		let superText =  researcherText + speciesText + habitatText;
		let newInput = document.createElement('p');
		newInput.innerText = superText;
		resultsBox.appendChild(newInput);
	}

}