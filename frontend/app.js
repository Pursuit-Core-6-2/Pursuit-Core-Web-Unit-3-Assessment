document.addEventListener('DOMContentLoaded', () => {
    // getAllSightings()
    
    let researchersBtn = document.querySelector('#researchers-btn')
    researchersBtn.addEventListener('click', getAllResearchers)

    let sightingsBtn = document.querySelector('#sightings-btn')
    sightingsBtn.addEventListener('click', getAllSightings)
})

const getAllResearchers = async() => {
    let researchersUrl = 'http://localhost:3000/researchers'
    try {
        let response = await axios.get(researchersUrl)
        console.log('researchers', response.data.payload)
        displayResearchers(response.data.payload)
    } catch (error) {
        return error
    }
}
//////////////////////////////////////////////////////////////

const displayResearchers = (researchers) => {
    let researcherDiv = document.querySelector('.researchers')
    let listContainer = document.querySelector('ul')
        for (let i = 0; i < researchers.length; i++) {
            let reseachersList = document.createElement('li')
            reseachersList.innerText = researchers[i].name
            let researcherJob = document.createElement('p')
            researcherJob.innerText = researchers[i].job_title
            console.log('list of researchers name', reseachersList.innerText)
             console.log('list of researchers job', reseacherJob.innerText)
        }
} 

const getAllSightings = async() => {
    let url = 'http://localhost:3000/sightings'
    try {
    
        let response = await axios.get(url) 
        // console.log('response', response.data.data)
        displaySightings(response.data.data)
     
    } catch(error) {
         return error
     }
}

const displaySightings = (sightings) => {
    console.log('sightings', sightings)
    let sightingDiv = document.querySelector('#sightings')
    for (let i = 0; i < sightings.length; i++) {
        let showSightings = document.querySelector('ol')
        showSightings.innerText = sightings[i].id
        let infoList = document.createElement('li')
        infoList.innerText = sightings[i].researcher_id
       
        sightingDiv.appendChild(infoList)
    }
     console.log('HEY', showSightings.innerText)
}