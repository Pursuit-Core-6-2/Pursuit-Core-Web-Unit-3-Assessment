document.addEventListener('DOMContentLoaded', async () => {
    
    // form
    const myForm = document.querySelector('form');

    // Select
    const selectTag = document.querySelector('select');

    // Button
    const allSightsBtn = document.querySelector('#getAllSights');

    //DIV
    const resultDiv = document.querySelector('#results');
    const feedbackDiv = document.querySelector('#feedback');

    // Paragraph
    const feedbackText = document.querySelector('#feedbackText');


    // HIDING THE FEEDBACK DIV AT THE LOAD
    feedbackDiv.style.display = 'none';

    feedbackDiv.addEventListener('click', event => {
        if (event.target.nodeName === 'DIV' 
            && event.target.innerText === 'X'
            && event.target.parentNode === feedbackDiv) {
                feedbackDiv.style.display = 'none';
        }
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            feedbackDiv.style.display = 'none';
        }
    })


    const allResearchers = await getAllResearchers(feedbackDiv, feedbackText);
    
    for (let person of allResearchers) {
        const optionTag = document.createElement('option');
        optionTag.value = person.id;
        optionTag.innerText = person.name;
        selectTag.appendChild(optionTag)
    }

    myForm.addEventListener('submit', event => {
        event.preventDefault();

        const selectedResearcherID = selectTag.value;
        if (selectedResearcherID === '---') {
            getAllSightings(resultDiv ,feedbackDiv, feedbackText)
        } else {
            getAllSightingsByResearcherID(selectedResearcherID, resultDiv ,feedbackDiv, feedbackText)
        }
    })

    allSightsBtn.addEventListener('click', () => {
        getAllSightings(resultDiv ,feedbackDiv, feedbackText)
    })


}) ////////////////////////////////////////////////////////////


const getAllResearchers = async (containerDiv, textContainer) => {
    try {
        const response = await axios.get(`http://localhost:29000/researchers`);
        return response.data.payload
    } catch (err) {
        containerDiv.style.display = 'block'
        if (err.response.data.message) {
            textContainer.innerText = err.response.data.message;
        } else {
            textContainer.innerText = err
        }
    }
}

const getAllSightings = async (resultContainer, feedbackContainer, textContainer) => {
    try {
        const response = await axios.get(`http://localhost:29000/sightings`);
        displayResultIntoDOM(response.data.payload, resultContainer, feedbackContainer, textContainer);
    } catch (err) {
        feedbackContainer.style.display = 'block'
        if (err.response.data.message) {
            textContainer.innerText = err.response.data.message;
        } else {
            textContainer.innerText = err
        }
    }
}

const getAllSightingsByResearcherID = async (id, resultContainer, feedbackContainer, textContainer) => {
    try {
        const response = await axios.get(`http://localhost:29000/sightings/researchers/${id}`);
        displayResultIntoDOM(response.data.payload, resultContainer, feedbackContainer, textContainer);
    } catch (err) {
        feedbackContainer.style.display = 'block'
        if (err.response.data.message) {
            textContainer.innerText = err.response.data.message;
        } else {
            textContainer.innerText = err
        }
    }
}

const displayResultIntoDOM = async (data, resultContainer, feedbackContainer, textContainer) => {
    resultContainer.innerText = '';
    
    if (data.length) {
        const ul = document.createElement('ul');
        resultContainer.appendChild(ul);

        let researcherName;
        let animalSpecies;
        let animalNickname;
        let habitat;

        for (let result of data) {
            try {
                const person = await axios.get(`http://localhost:29000/researchers/${result.researcher_id}`);
                researcherName = person.data.payload.name;
            } catch (err) {
                feedbackContainer.style.display = 'block'
                if (err.response.data.message) {
                    textContainer.innerText = err.response.data.message;
                } else {
                    textContainer.innerText = err
                }
            }

            try {
                const animal = await axios.get(`http://localhost:29000/species/${result.species_id}`);
                animalSpecies = animal.data.payload.name;
            } catch (err) {
                feedbackContainer.style.display = 'block'
                if (err.response.data.message) {
                    textContainer.innerText = err.response.data.message;
                } else {
                    textContainer.innerText = err
                }
            }

            try {
                const animal = await axios.get(`http://localhost:29000/animals/${result.species_id}`);
                animalNickname = animal.data.payload.nickname;
            } catch (err) {
                feedbackContainer.style.display = 'block'
                if (err.response.data.message) {
                    textContainer.innerText = err.response.data.message;
                } else {
                    textContainer.innerText = err
                }
            }

            try {
                const location = await axios.get(`http://localhost:29000/habitats/${result.habitat_id}`);
                habitat = location.data.payload.category;
            } catch (err) {
                feedbackContainer.style.display = 'block'
                if (err.response.data.message) {
                    textContainer.innerText = err.response.data.message;
                } else {
                    textContainer.innerText = err
                }
            }

            const li = document.createElement('li');
            li.innerText = `${researcherName} spotted ${animalNickname} the ${animalSpecies} in the ${habitat}`;
            ul.appendChild(li);
        } 
    } else {
        resultContainer.innerText = 'No results matching the selected researcher';
    }
}