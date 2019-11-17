document.addEventListener('DOMContentLoaded', () => {
    loadResearchers();
    let loadAll =  document.querySelector('#load');
    loadAll.addEventListener('click', loadAllSightings)
    let search = document.querySelector('#submitSearch');
    search.addEventListener('click', loadSightingsFromResearcher)
});

const loadResearchers = async () => {
    const url = 'http://localhost:3000/researchers/'
    let list = document.querySelector('#researchers');
    list.size = 0;
    let defaultOption  = document.createElement('option');
    defaultOption.text = "Choose Researcher";
    list.add(defaultOption);
    const response = await axios.get(url);
    response.data.payload.researchers.forEach((researcher)  => {
        let option = document.createElement('option');
        option.text = `${researcher.name}`
        option.value = researcher
        list.add(option)
    });
};

const loadAllSightings = async (event) => {
    event.preventDefault()
    let sightings = document.querySelector('#sightings');
    sightings.innerHTML =  ""
    console.log('button clicked');
    const url = 'http://localhost:3000/sightings/'
    let response = await axios.get(url)
    

    response.data.payload.sightings.forEach((sighting) => {
        let dataContainer = document.createElement('div');
        let sightingDescription = document.createElement('p')
        let researcherName = sighting.name;
        let speciesName = sighting.sp_name;
        let habitat = sighting.category;

        sightingDescription.innerText = `${researcherName} spotted a ${speciesName} in the ${habitat}`

        dataContainer.appendChild(sightingDescription)

        sightings.append(dataContainer)
    })
};

const loadSightingsFromResearcher = async (event) => {
    event.preventDefault()
    let sightings = document.querySelector('#sightings');
    sightings.innerHTML =  ""
    console.log('button clicked');

    let list = document.querySelector('#researchers');
    let researcherId = list.options[list.selectedIndex].index;
    const url = 'http://localhost:3000/sightings/researchers/';
    const response = await axios.get(url + researcherId);

    response.data.payload.sightings.forEach((sighting) => {
        if(researcherId === sighting.researcher_id) {
            console.log(sighting)
            let dataContainer = document.createElement('div');
            let sightingDescription = document.createElement('p')
            let researcherName = sighting.name;
            let speciesName = sighting.sp_name;
            let habitat = sighting.category;

            sightingDescription.innerText = `${researcherName} spotted a ${speciesName} in the ${habitat}`

            dataContainer.appendChild(sightingDescription)

            sightings.append(dataContainer)
        }
    })
}