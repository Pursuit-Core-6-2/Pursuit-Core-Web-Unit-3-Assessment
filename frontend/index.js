document.addEventListener('DOMContentLoaded', () =>  {
   console.log("running ")
loadInfo();
loadSightings();
})


async function loadInfo () {
   const url = `http://localhost:3000/researchers`
      console.log('Researchers has loaded');
      try{
        
          let user2 =  await axios.get(url)
        
         .then((response)=> 
        
         {return response.data.payload});
        
         createUserCard(user2)
         return user2

      } catch (error){
         console.log(error)
      }
  }

async function loadSightings() {
   const url = 'http://localhost:3000/sightings/'
      console.log('All Sightings loaded');
      try{
        let arr =  await axios.get(url)
        .then((response)=> 
        {return response.data.payload});
        createPostCard (arr)
       
      } catch (error){
          console.log(error);
      };
  };


const createPostCard = (sightArr) => {
   
   for(let i =0; i < sightArr.length; i++){
      if (sightArr[i].researcher_id === ){
       let researcher = sightArr[i].researcher_id
       let species = sightArr[i].species_id
       let habitat = sightArr[i].habitat_id
       displayPostCard(researcher, species, habitat)
       }
      }
}

function createUserCard (researchers) {
   //console.log("user", user)
   for(let i =0; i < researchers.length; i++){
      let name = (researchers[i].id);
      //let job_title = (researchers[i].job_title);
     // console.log(name)
      displayResearcher(name);
      }
}

function displayResearcher (name) { 
   const cardDiv = document.querySelector('#IDnumbers')
 //  userDiv.setAttribute ('id', '')
   const name1 = document.createElement('option');
 //const job1 = document.createElement('h3');
   name1.innerText = name;
  //job1.innerText = job;
 //userDiv.append(name1);
   cardDiv.appendChild(name1)
  }

async function match () {
   
}

const displayPostCard = (re,se,ha) => { 
   const userDiv = document.querySelector('#sight')
 //const postDiv = document.createElement('div');
  // postDiv.setAttribute('class', 'post');
   const name = document.createElement('h2');
   name.innerText = re
   const spe = document.createElement('p')
   spe.innerText = se
   const hab = document.createElement('p')
   hab.innerText = ha
   
   userDiv.appendChild(name, spe, hab);
   
   }
