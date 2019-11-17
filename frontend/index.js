document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM is loaded')
    let allSightingsBtn = document.querySelector('#displayAllSighting');
    allSightingsBtn.addEventListener('click', (event) =>{
        displayAllSighting();
    })
})

const researcherSightings = document.querySelector('#researcherName')

const getAllSightings = async () => {
let allSightings = `http://localhost:4110/sightings/all`
try{
   let sightingsArr =  await axios.get(allSightings).then((response)=>{response.data.payload})
   console.log(sightingsArr)
}catch (error) {
    console.log(error)
}
 
}




const displayAllSighting = () =>{
   


}

const createPost 