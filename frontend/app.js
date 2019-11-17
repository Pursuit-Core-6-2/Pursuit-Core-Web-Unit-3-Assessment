document.addEventListener('DOMContentLoaded', () => {

})

const getAllResearchers = async() => {
    let url = 'http://localhost:3000/researchers'
    try {
    
        let response = await axios.get(url) 
        console.log(url)
     
    } catch(error) {
         return error
     }
}