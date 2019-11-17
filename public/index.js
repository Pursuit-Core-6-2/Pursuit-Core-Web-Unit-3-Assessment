document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('#btn-all')
        .addEventListener('click', async () => {
            getAllSightings();
        })

    document.querySelector('#btn-res')
        .addEventListener('click', async () => {
            getResearcherSightings();
        })
})

const getAllSightings = async () => {
    const ul = document.querySelector('#as-list');
    ul.innerHTML = '';

    const data = await axios.get(`http://localhost:3000/sightings`);

    console.log(data.data);

    data.data.payload.forEach(ele => {
        const li = `<li id='${ele.si_id}' style='text-align: center'>
            Sightings ID: ${ele.si_id} | Species ID: ${ele.si_species_id} |
            Researcher ID: ${ele.si_researcher_id} | Habitat ID: ${ele.si_habitat_id}
        </li>`;

        ul.innerHTML += li;
    })
}

const getResearcherSightings = async () => {
    const id = document.querySelector('#input-id').value;

    if (id.length === 0) {
        document.querySelector('#input-id').placeholder = 'Enter a number '
        return;
    }


    const ul = document.querySelector('#rs-list');
    ul.innerHTML = '';

    const data = await axios.get(`http://localhost:3000/sightings/researchers/${id}`);

    console.log(data.data);

    data.data.payload.forEach(ele => {
        const li = `<li id='${ele.si_id}' style='text-align: center'>
            Sightings ID: ${ele.si_id} | Species ID: ${ele.si_species_id} |
            Researcher ID: ${ele.si_researcher_id} | Habitat ID: ${ele.si_habitat_id}
        </li>`;

        ul.innerHTML += li;
    })
}