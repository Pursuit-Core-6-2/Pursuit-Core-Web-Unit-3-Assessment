document.addEventListener('DOMContentLoaded', () => {
    loadResearcher()

    const searchUsers = document.querySelector('#displayAllSightings');
    searchUsers.addEventListener('submit', () => {
        searchResearcher()
    });
})




async function loadResearcher() {
    let allPost = document.querySelector("#allSightingsResults");
    allPost.innerHTML = "";
    let response = await axios.get(`http://localhost:5000/sightings/`)

    console.log(response.data.payload)


    response.data.payload.forEach((sighting) => {
        console.log(sighting)

        let resultDiv = document.createElement('div')
        resultDiv.className = "allResultsDiv"
        allPost.appendChild(resultDiv)
        let id = document.createElement('li')
   

        console.log(sighting)

        id.innerText = `researcher: ${sighting.researcher} , animal: ${sighting.animal} , catergory: ${sighting.catergory}`
        resultDiv.append(id)
    })
}









async function searchResearcher() {
    event.preventDefault();
    let searchSingleResearcher = document.querySelector('#search').value
    const response = await axios.get(`http://localhost:5000/researchers/`)
    let responseArray = response.data.payload
    let filterid = []
    let name = []
    for (let i = 0; i < responseArray.length; i++) {
        let searchName = searchSingleResearcher.trim()
        if (responseArray[i].name.toUpperCase().includes(searchName.toUpperCase())) {
            filterid.push(responseArray[i].id)
            name.push(responseArray[i].name)
        }
    }
    const title = document.querySelector("#results")
    title.innerHTML = `Results for ${searchSingleResearcher}`;
    const resultUl = document.querySelector("#resultsUl");
    resultUl.innerHTML = ""
    for (let i = 0; i < filterid.length; i++) {
        let responseid = await axios.get(`http://localhost:5000/researchers/${filterid[i]}`)
        responseid.data.payload.forEach((reseacher) => {
            let searchDiv = document.createElement('div')
            searchDiv.className = "searchResultsDiv"
            resultUl.appendChild(searchDiv)
            let eachResult = document.createElement("li")
            eachResult.innerText = `${reseacher.researcher} : Animal: ${reseacher.animal} Habitat:${reseacher.catergory}`
            searchDiv.appendChild(eachResult)

        })
    }
}