document.addEventListener('DOMContentLoaded', () => {
    getAllResearchers()
})

const getAllResearchers = async() => {
    let url = 'http://localhost:3000/researchers'
    try {
    
        let response = await axios.get(url) 
        console.log('response', response)
     
    } catch(error) {
         return error
     }
}