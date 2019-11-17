document.addEventListener('DOMContentLoaded', () =>  {
   console.log("running ")
loadInfo();
loadSightings();
loadSightings2();
})

var empty =[null];
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
        createSightings(arr)
       
      } catch (error){
          console.log(error);
      };
  };

async function loadSightings2() {
   let sBox = document.querySelector('#IdNumbers')
   sBox.addEventListener ('change', (event) => {
      const div = document.querySelector('#otherDiv')
      let num = empty[event.target.selectedIndex]
      //console.log(num)
       fetch (`http://localhost:3000/sightings/researchers/${num}`)
         .then(response => 
            response.json()
            )
         .then(data => {
            while(div.firstChild) { //thanks for the empty Div clue up, reminds me of the poke API
               div.removeChild(div.firstChild) //had oldChild here for some reason, still remains unclear
           }
            let spe = document.createElement("h3")
               spe.innerText = data.species_id //whatever data is pulled is placed at respective areas  

            let re = document.createElement("p")
               re.innerText = data.researcher_id

            let hab = document.createElement("p")
               hab.innerText = data.habitat_id
 
            
            if(empty === null){
            spe.innerText = ""

            re.innerText = ""
   
            hab.innerText = ""
            }
            div.appendChild(spe)

            div.appendChild(re) //

            div.appendChild(hab)
         
         })
   }) // catch (error){
   //       console.log(error)
   // } 
}


//    const url = 'http://localhost:3000/sightings/'
//       console.log('All Sightings loaded');
//       try{
//         let arr = axios.get(url)
//         .then((response)=> 
//         {return response.data.payload});
//         createSightings (arr)
       
//       } catch (error){
//           console.log(error);
//       };
//   };

const createSightings = (sightArr) => {
   for(let i =0; i < sightArr.length; i++){
         let researcher = sightArr[i].researcher_id
         let species = sightArr[i].species_id
         let habitat = sightArr[i].habitat_id
         displayPostCard(researcher, species, habitat)
         }
      }


// const createPostCard = (sightArr) => {
//    for(let i =0; i < sightArr.length; i++){
//      // if (sightArr[i].researcher_id === user2.researchers_id ){
//       if (sightArr[i].researcher_id === 1){
//          let researcher = sightArr[i].researcher_id
//          let species = sightArr[i].species_id
//          let habitat = sightArr[i].habitat_id
//          displayPostCard(researcher, species, habitat)
//          }
//       }
// }

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
   const id = document.createElement('option');
 //const job1 = document.createElement('h3');
   id.innerText = name;
  //job1.innerText = job;
 //userDiv.append(name1);
   cardDiv.appendChild(id)
  }


const displayPostCard = (re,se,ha) => { 
   const userDiv = document.querySelector('#sight')
 //const postDiv = document.createElement('div');
  // postDiv.setAttribute('class', 'post');
   const name = document.createElement('h2');
   name.innerText = re
   const spe = document.createElement('h3')
   spe.innerText = se
   const hab = document.createElement('p')
   hab.innerText = ha
   
   userDiv.appendChild(name, spe, hab);
   
   }
