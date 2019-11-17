document.addEventListener('DOMContentLoaded', () => {
    loadSightings();

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