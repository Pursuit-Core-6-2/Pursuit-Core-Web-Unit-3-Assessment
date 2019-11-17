document.addEventListener('DOMContentLoaded', () => {

const getAllButton = document.querySelector('#getAll');
getAllButton.addEventListener('click', loadList)

// const researchButton = document.querySelector('#reseacherSightings');
// researchButton.addEventListener('click', loadReseacherList)
})

async function loadList(){
    let list = document.querySelector("#sightingsList")
    // list.innerText = ""

    const response = await axios.get(`http://localhost:8080/sightings`);
    console.log(response.data.payload)

    response.data.payload.forEach((sighting) => {
        let postList = document.createElement("li")
        console.log(sighting.id)
        console.log(sighting.researcher_id)
        console.log(sighting.habitat_id)
        console.log(sighting.species_id)
    postList.innerText = `researcher_id: ${sighting.researcher_id}  habitat_id: ${sighting.habitat_id} species_id: ${sighting.species_id}`
        list.appendChild(postList);
    })
}