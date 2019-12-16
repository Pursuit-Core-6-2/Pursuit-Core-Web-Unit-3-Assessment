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
    let myList = document.querySelector("#list");
    if(!myList){    
    let myList = document.createElement("ul");
        myList.id="list";
    let container = document.querySelector("#container");
        checkContainer(container);
        container.append(myList);
    let allSightingsArr = await getAllSightings();
    allSightingsArr.forEach(sightingsObj => {
        return createSightingsList(sightingsObj)
    })
    }
}
const getAllSightings = async () => {
    let url = `http://localhost:3000/sightings/`;
    let allSightingsObj = await axios(url).then((response) => {return response.data.payload});
    return allSightingsObj;
}
const createSightingsList = (sightingObj) => {
    let myList = document.querySelector("#list");
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
        console.log("selectBoxValue", selectBoxValue)
    let url = `http://localhost:3000/sightings/researchers/${selectBoxValue}`;
    let researcherSightings = await axios.get(url).then(response => {return response.data.payload});
    return researcherSightings;
};
const getReseacherById = async (id) => {
    let url = `http://localhost:3000/researchers/${id}`;
    let rObj = await axios.get(url).then((response) => {return response.data.payload});
    return rObj;
}
const displayInfo = async() => {
    let researcherUl = document.createElement("ul");
    let container = document.querySelector("#container");
    let sightingsArr = await getSightings();
        sightingsArr.forEach((sightingsObj) => {
            let researcher_name = sightingsObj.r_name;
            let species_name = sightingsObj.s_name;
            let habitat_name = sightingsObj.category;
            let string = `A ${species_name} was spotted by ${researcher_name} in the ${habitat_name}`
            let li = document.createElement('li');
                li.innerText = string;
                researcherUl.append(li);
        })
            checkContainer(container);
            container.append(researcherUl)
}
const checkContainer = (container) => {
    if(container.querySelector('ul')) {
        let ul = document.querySelector('ul');
        container.removeChild(ul);
    }
}