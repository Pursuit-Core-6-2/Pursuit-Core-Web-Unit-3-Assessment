document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded');
    loadSightings();
    const button = document.querySelector('button')
    button.addEventListener('click', (event) => {
        const input = document.querySelector('#input')
        const id = input.value
    
        const url = `http://localhost:3000/sightings/researcher/${id}`
        fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            
        })
    })
    
   
})


const loadSightings = async() => {
    const container = document.querySelector('#container');
    container.innerHTML = "";

    const sightingsResponse = await axios.get('http://localhost:3000/sightings/all');
        const researchersResponse = await axios.get('http://localhost:3000/researchers/all');
            const speciesResponse = await axios.get('http://localhost:3000/species/all');
                const habitatsResponse = await axios.get('http://localhost:3000/habitats/all');

        let sightings= sightingsResponse.data.payload
        let researchers = researchersResponse.data.payload
        let species = speciesResponse.data.payload
        let habitats = habitatsResponse.data.payload

    for(let i = 0; i < sightings.length; i++){
        
            let p = document.createElement('p')
            p.innerText = 'Sighting # ' + sightings[i].id + ' was made by researcher '  + researchers[i].full_name + ' of the species ' + 
            species[i].species_name + ' in their habitat of ' + habitats[i].category;
            container.appendChild(p) 
    }
}







    


     
   
