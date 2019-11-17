document.addEventListener('DOMContentLoaded', () => {
    const selectBox = document.querySelector('#selectTag');
    createOptions(selectBox);
    selectBox.addEventListener('change', getSightings);
})
const getSightings = async () => {
    const selectBox = document.querySelector('#selectTag');
    let selectBoxValue = Number(selectBox.value);
    let url = `http://localhost:3000/sightings/researchers/${selectBoxValue}`;
    let researcherSightings = await axios.get(url).then(response => {return response.data.payload})
    researcherSightings.forEach(elem => {
        getAnimalById(elem.id)
    })

};
const createOptions = async (selectBox) => {
    let url = `http://localhost:3000/researchers`
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
const getAnimalById = async (id) => {
    let url = `http://localhost:3000/animals/${id}`;
    let animalsObj = await axios.get(url).then(response => {return response.data.payload})
    console.log(animalsObj)
}
