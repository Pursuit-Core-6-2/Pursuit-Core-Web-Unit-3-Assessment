document.addEventListener('DOMContentLoaded', () => {
    loadSightings();

    const staffSightForm = document.querySelector('#displayStaffSightings');

    staffSightForm.addEventListener('submit', loadResearcherSightings);

});

async function loadSightings() {
    const sightingsList = document.querySelector('#sightingsList');
    sightingsList.innerHTML = "";
    const response = await axios.get(`http://localhost:1337/sightings`);
    response.data.payload.forEach((sighting) => {
        let listSighting = document.createElement("li");
        listSighting.innerText = `Sighting ID: ${sighting.id}, Researcher ID: ${sighting.researcher_id}, Species ID: ${sighting.species_id}, Habitat ID: ${sighting.habitats_id}`;
        sightingsList.appendChild(listSighting);
    });
}

async function loadResearcherSightings(event) {
    event.preventDefault();    
    const researcher_id = document.querySelector('#staff-id-sightings').value;
    const researcherSightList = document.querySelector('#researcherSightingList');
    researcherSightList.innerHTML = "";
    let response = await axios.get(`http://localhost:1337/sightings/researchers/${researcher_id}`);
    // console.log(response);
    response.data.payload.forEach((sightings) => {
        console.log(sightings);
        let listSighting = document.createElement("li");
        listSighting.innerText = `Researcher Name: ${sightings.name}, Species ID: ${sightings.species_id}, Habitat ID: ${sightings.habitats_id}`;
        console.log(listSighting);
        researcherSightList.appendChild(listSighting);
    });
}