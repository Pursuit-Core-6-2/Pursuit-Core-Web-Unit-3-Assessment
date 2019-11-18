document.addEventListener('DOMContentLoaded', () => {

const getAllButton = document.querySelector('#getAll');
getAllButton.addEventListener('click', loadList)

const researchButton = document.querySelector('#researcherSightings');
researchButton.addEventListener('click', loadReseacherList)
})

async function loadList(){
    let list = document.querySelector("#sightingsList")
    // list.innerText = ""

    const response = await axios.get(`http://localhost:8080/sightings/allSightings`);
    console.log(response.data.payload)

    response.data.payload.forEach((sighting) => {
        let postList = document.createElement("li")
        // console.log(sighting.id)
        // console.log(sighting.researcher_id)
        // console.log(sighting.habitat_id)
        // console.log(sighting.species_id)
    postList.innerText = `${sighting.researchers} has spotted ${sighting.species} in ${sighting.habitats} ${sighting.sightings} time`
        list.appendChild(postList);
    })
}

async function loadReseacherList(){
    // console.log("hitting function")
    let id = document.querySelector("#researcher_name").value
    // console.log(id)
    const response = await axios.get(`http://localhost:8080/sightings/researchers/${id}`)
    const speciesResponse = await axios.get(`http://localhost:8080/sightings/species/${id}`)
    // console.log(response.data.payload)
    // console.log(speciesResponse.data.payload)

    let researcher = response.data.payload.researchers
    let sighting = response.data.payload.sightings
    let species = speciesResponse.data.payload.species

    const empPara = document.querySelector('#researcherPara')
    // empPara.innerText = JSON.stringify(response.data);
    empPara.innerText = `${researcher} has spotted ${species} ${sighting} times`
}

 //let researcher = document.querySelector("#researcher_name").value
    // console.log(id)
   // const response = await axios.get(`http://localhost:8080/sightings/allSightings/${researcher}`)
    //console.log(response.data.payload)
    // let arr = response.data.payload
   // let name = response.data.payload.researchers
   // let sighting = response.data.payload.sightings
//     let species = response.data.payload.species
    // let habitat = response.data.payload.habitat

    // for(let i = 0; i <= arr.length; i++){
    //     if (researcher === arr[i]){
    //         const empPara = document.querySelector('#researcherPara')
    // // empPara.innerText = JSON.stringify(response.data);
    //         empPara.innerText = `${name} has spotted ${species} in ${habitat}, ${sighting} times`
    //     }
    // }