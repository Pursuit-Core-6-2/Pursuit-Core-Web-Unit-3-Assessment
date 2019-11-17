document.addEventListener('DOMContentLoaded', ()=>{
    fetchSightings()
})

const fetchSightings = () =>{
    const bottom = document.querySelector('#bottom')
    axios.get('http://localhost:3000/sightings').
    then(response =>{
        let researcher_id = response.data.payload.sightings[0].researcher_id
        let species_id = response.data.payload.sightings[0].species_id
        let habitat_id = response.data.payload.sightings[0].habitat_id
        console.log(fetch_researcher(researcher_id))
        // fetch_species(species_id)
        // fetch_habitat(habitat_id)
    })
}

const fetch_researcher = (id) =>{
    axios.get(`http://localhost:3000/researchers/${id}`)
    .then(response =>{
        name = response.data.payload.researcher.full_name
    })
    return name
}