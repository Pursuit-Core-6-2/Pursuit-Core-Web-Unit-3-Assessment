document.addEventListener("DOMContentLoaded", () => {
    const seeAllSightingsButton = document.querySelector("#seeAllSightingsButton");
    const allSightingsDiv = document.querySelector("#allSightingsDiv");
    
    const input = document.querySelector("#input");
    const seeResearchersSightingsButton = document.querySelector("#seeResearchersSightingsButton");
    const researcherSightingsDiv = document.querySelector("#researcherSightingsDiv");

    const showAllSightings = async () => {
        allSightingsDiv.innerHTML = "";
        const response = await axios.get(`http://localhost:3000/sightings/`);
        console.log("response:", response);
    
        const sightings = response.data.payload;
        sightings.forEach((eachPost) => {
        let paragraph = document.createElement("p");
        paragraph.innerText = `Species ID: ${eachPost.species_id}, Researcher ID: ${eachPost.researcher_id}, Species ID: ${eachPost.habitat_id}`;
        allSightingsDiv.appendChild(paragraph);
        });
    }
    seeAllSightingsButton.addEventListener("click", showAllSightings);


    const showSpecificSighting = async () => {
        let inputValue = parseInt(input.value);
        researcherSightingsDiv.innerHTML = "";
        const response = await axios.get(`http://localhost:3000/sightings/researchers/${inputValue}`);
        
        const sightings = response.data.payload;
        sightings.forEach((eachPost) => {
        let paragraph = document.createElement("p");
        paragraph.innerText = ` Researcher ID: ${eachPost.researcher_id}, Species ID: ${eachPost.species_id}, Habitat ID: ${eachPost.habitat_id}`;
        researcherSightingsDiv.appendChild(paragraph);
        });
    }
    seeResearchersSightingsButton.addEventListener("click", showSpecificSighting);
});

