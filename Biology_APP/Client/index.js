document.addEventListener('DOMContentLoaded', ()=>{
    console.log("Content Loaded")
    loadResearchers()
    let loadSightings = document.querySelector('#Load');
    loadSightings.addEventListener('click', loadAllSightings )
    let searchSightings = document.querySelector(`#Search`)
    searchSightings.addEventListener('click', loadResearcherSightings)
} )

const loadResearchers = async () =>{
    const url = 'http://localhost:3000/researchers/'
    
    let list = document.querySelector('#researchers')
    list.size = 0;
    
    let defaultOption = document.createElement('option')
    defaultOption.text = "Choose Researcher"
    list.add(defaultOption)
    const res = await axios.get(url);
    res.data.payload.researchers.forEach((researcher)=>{
        let option = document.createElement('option')
        option.text = `${researcher.r_name}`
        option.value = researcher
        list.add(option)
    })
}

const loadAllSightings = async (event) =>{
    event.preventDefault()
    let sightings = document.querySelector('#sightings');
    sightings.innerHTML = ""
    console.log("Clicked Sightings");
    const url = 'http://localhost:3000/sightings/'
    let res = await axios.get(url)
    // console.log(res.data.payload)
    // console.log(res.data.payload.sightings)

    res.data.payload.sightings.forEach( (sighting) =>{
        let container = document.createElement('div');
        let sightingDes = document.createElement('p')
        let researcherName = sighting.r_name;
        let speciesName = sighting.sp_name;
        let habitat = sighting.category;

        console.log(sighting)
        console.log(researcherName, speciesName, habitat)
        sightingDes.innerText = `${researcherName} spotted a ${speciesName}
        in the ${habitat}`

        container.appendChild(sightingDes)
        sightings.append(container)
    })
}

const loadResearcherSightings = async (event)=> {
    event.preventDefault()
    let sightings = document.querySelector(`#sightings`);
    sightings.innerHTML = "";
    console.log('clicked researcher');
    
     

    let list = document.querySelector(`#researchers`)
    let researcherId = list.options[list.selectedIndex].index;
    console.log("id: " ,researcherId)
    const url = `http://localhost:3000/sightings/researcher/`
    const res = await axios.get(url + researcherId)

    console.log(res.data.payload.sightings)

    res.data.payload.sightings.forEach((sighting)=>{
        
        console.log(sighting)
        if (researcherId === sighting.researcher_id){
            let container = document.createElement('div')
            let sightingsDesc = document.createElement('p')
            let researcherName = sighting.r_name;
            let speciesName = sighting.sp_name;
            let habitat = sighting.category;

            sightingsDesc.innerText = `${researcherName} spotted a
            ${speciesName} in the  ${habitat} habitat`;

            container.appendChild(sightingsDesc)
            
            sightings.append(container);
        }
    
    })
    
    

}