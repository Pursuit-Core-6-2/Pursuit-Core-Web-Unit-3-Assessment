document.addEventListener('DOMContentLoaded', () => {
    loadResearcher()
    const searchUsers = document.querySelector('#displayAllSightings');
    searchUsers.addEventListener('submit', () => {

        searchResearcher()
    });


    // const addUser = document.querySelector('#addUser');
    // addUser.addEventListener('submit', () => {
    //     addAUser()
    // });
    // const deleteUser = document.querySelector('#deleteUser');
    // deleteUser.addEventListener('submit', () => {
    //     deleteAUser()
    // });
})




async function loadResearcher() {
    // location.reload(true);
    const allPost = document.querySelector("#allSightingsResults");
    allPost.innerHTML = "";
    const response = await axios.get(`http://localhost:5000/sightings/`)
    console.log(response)
    console.log(response.data)

    console.log(response.data.payload)
    response.data.payload.forEach((sighting) => {
        console.log(sighting.id)
        let resultDiv = document.createElement('div')
        resultDiv.className = "allResultsDiv"
        allPost.appendChild(resultDiv)
        let id = document.createElement('li')
        id.innerText = `${sighting.habitat_id}  ${sighting.id}   ${sighting.researcher_id} ${sighting.species_id} `

        // let usersUserName = document.createElement('li')
        // usersUserName.className = "usersUserName"
        // let usersAge = document.createElement('li')
        // usersAge.className = "usersAge"
        console.log(sighting)

        // usersName.innerText =sighting.
        resultDiv.append(id)
    })
}


// async function loadResearcher() {
//     const response = await axios.get(`http://localhost:5000/researchers/`)
// }


async function searchResearcher() {
    // loadResearcher()
    event.preventDefault();
    const searchSingleResearcher = document.querySelector('#search').value
    console.log(searchSingleResearcher)
    const response = await axios.get(`http://localhost:5000/researchers/`)
    let responseArray = response.data.payload
    console.log(responseArray)
    let idReseracher = filterId(responseArray, searchSingleResearcher)
    console.log(idReseracher)

   


        const sightingsByResercher = await axios.get(`http://localhost:5000/researchers/${idReseracher}`)
        console.log(sightingsByResercher)
        const singleResearcherResultDiv = document.querySelector("#singleResearcherResult")

        sightingsByResercher.data.payload.forEach((sighting) => {
            console.log(sighting)
            let eachResult = document.createElement("li")
            eachResult.innerText = `Animal: ${sighting.name} Habitat:${sighting.catergory}`
            singleResearcherResultDiv.append(eachResult)
        })
    // }
    // loadResearcher()
}

const filterId = (response, searchSingleResearcher) => {
    let id = -1
    for (let i = 0; i < response.length; i++) {
       
        if (searchSingleResearcher === response[i].name) {
            console.log(searchSingleResearcher)
            console.log(response[i].name)
            console.log(i)
       id = response[i].id
        } else {
           id =  -1
        }

    }
    return id
}
