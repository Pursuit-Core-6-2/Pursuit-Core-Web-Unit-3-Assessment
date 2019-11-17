document.addEventListener('DOMContentLoaded', () => {
   const form = document.querySelector('#marine-form')
   const allSightingsButton = document.querySelector('#all-sightings')
//    form.addEventListener('submit', )
   allSightingsButton.addEventListener('click', fetchSightingData )
    fetchSightingData()
})

const fetchSightingData = async () => {
    const result = await axios.get(`http://localhost:5000/sightings/`)
    const researchersData = result.data.payload
    
    // document.querySelector('#')
}

const handleAllSightings = () => {

}