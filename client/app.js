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
        displaySpecificSightings()
    })
}

const displaySpecificSightings = () => {

}