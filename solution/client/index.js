document.addEventListener('DOMContentLoaded', () => {
    const selectBox = document.querySelector('#selectTag');
    createOptions(selectBox);
    selectBox.addEventListener('change', displayInfo);
})
const createOptions = async (selectBox) => {
    let url = `http://localhost:3000/researchers`;
    let researcherObjs = await axios.get(url).then(response => {return response.data.payload});
    researcherObjs.forEach((elem) => {
        let newOption = document.createElement('option');
        let researcherName = elem.r_name;
        let researcherId = elem.id;
            newOption.label = researcherName;
            newOption.value = researcherId;
            selectBox.append(newOption);
    });
};
const displayAllSightings = async () => {
    let allSightingsArr = await getAllSightings();
    allSightingsArr.forEach(sightingsObj => {
        return createSightingsPara(sightingsObj)
    })
}
const getAllSightings = async () => {
    let url = `http://localhost:3000/sightings/`;
    let allSightingsObj = await axios(url).then((response) => {return response.data.payload});
    return allSightingsObj;
}
const createSightingsPara = (sightingObj) => {
    let myList = document.querySelector("ul");
    let name = sightingObj.r_name;
    let animal = sightingObj.s_name;
    let location = sightingObj.category;
    let li = document.createElement("li");
    if(animal[0].match(/^[aeiouAEIOU]/)) {
        li.innerText = `An ${animal} was spotted by ${name} in the ${location}`
    }
    else {
        li.innerText = `A ${animal} was spotted by ${name} in the ${location}`
    }
    myList.append(li)
}
const getSightings = async () => {
    const selectBox = document.querySelector('#selectTag');
    let selectBoxValue = Number(selectBox.value);
    let url = `http://localhost:3000/sightings/researchers/${selectBoxValue}`;
    let researcherSightings = await axios.get(url).then(response => {return response.data.payload});
    return researcherSightings;
};
const getReseacherById = async (id) => {
    let url = `http://localhost:3000/researchers/${id}`;
    let rObj = await axios.get(url).then((response) => {return response.data.payload});
    return rObj;
}
const getSpeciesById = async (id) => {
    let url = `http://localhost:3000/species/${id}`;
    let speciesObj = await axios.get(url).then(response => {return response.data.payload});
    return speciesObj;
}
const getHabitatById = async (id) => {
    let url = `http://localhost:3000/species/${id}`;
    let habitatObj = await axios.get(url).then(response => {return response.data.payload});
    return habitatObj;
}
const displayInfo = async() => {
    let ul = document.querySelector('#list');
    let li = document.createElement('li');
    let sightingsArr = await getSightings();
    sightingsArr.forEach((elem) => {
        let researcherId = elem.researcher_id;
        let speciesId = elem.species_id;
        let habitatId = elem.habitat_id;
        console.log(researcherId, speciesId, habitatId);
    })
        // li.innerText = `A ${speciesName} was spotted by ${researcherName} in the`
        // ul.append(li);
}

//Main issue with the entire frontend was using async await functions within each other, resulting in promises being produced without being resolved. Potential solution would be joining tables needed (researchers, species and habitats) to make information easily accessible through a single axios call. After that, it would be possible to key into given array objects and obtain information needed to be displayed on frontend.