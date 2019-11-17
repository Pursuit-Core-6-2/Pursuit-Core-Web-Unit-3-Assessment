document.addEventListener('DOMContentLoaded', () => {
    getAllSightings()
    listenToForm()
})


const getAllSightings = async () => {
let url = "http://localhost:3000/sightings"
let response = await axios.get(url)
let sightings = response.data.payload
console.log(sightings)
displayAllSightings(sightings)
}

const displayAllSightings = async (data) => {
let list = document.querySelector("#allSightings")
data.forEach(el => {
    let sightingNum = el.id 
    let job_title = el.job_title 
    let researcher = el.firstname 
    let animal = el.name 
    let habitat = el.category 

    let listItem = document.createElement('li')
    listItem.innerText = `Researcher: ${job_title} - ${researcher} | Animal: ${animal} | Habitat: ${habitat}`
    list.append(listItem)
});
}

const listenToForm = () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', () => {
        event.preventDefault()
        getSpecificSightings()
    })
}

const getSpecificSightings = async () => {
    let url = "http://localhost:3000/sightings"
    let response = await axios.get(url)
    let sightings = response.data.payload
    displaySpecificSightings(sightings)
}

const displaySpecificSightings = (data) => {
    let secondList = document.querySelector("#specificSightings")
    let input = document.querySelector('#user_input').value

    let form = document.querySelector('form')
    form.reset()
    
    let filteredData = data.filter(el => {return el.firstname === input})

    let heading = document.querySelector('h3')
    heading.innerText = `Sightings by: ${filteredData[0].job_title} - ${filteredData[0].firstname}`

    filteredData.forEach(el => {
        let sightingNum = el.id 
        let job_title = el.job_title 
        let researcher = el.firstname 
        let animal = el.name 
        let habitat = el.category 
    
        let listItem = document.createElement('li')
        listItem.innerText = `Animal: ${animal} | Habitat: ${habitat}`
        secondList.append(listItem)
    })
}