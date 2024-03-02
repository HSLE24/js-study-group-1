const API_KEY = `4a1471f63a0a4ef081c3a604886e6ac4`;
let recipesList = [];
const category = document.querySelectorAll('.nation-category button')

category.forEach(category=>category.addEventListener("click",(event)=>
recipesByCategory(event)))


const getRecipe=async()=>{
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=16`);
    
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data.results;
    render();
}

const recipesByCategory=async(event)=>{
    const cuisine = event.target.textContent;
    console.log("best", cuisine)
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&number=16`)
    const response = await fetch(url);
    const data = await response.json();
    
    recipesList = data.results;
    render();
}

const getRecipeByKeyword=async()=>{
    const keyword = document.getElementById('search-input').value;
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${keyword}&number=16`)
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data.results;
    searchRender();
}

const getInfo=async(id)=>{
    const infoUrl = new URL(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    console.log("four", infoUrl)
    const response = await fetch(infoUrl);
    const infoData = await response.json();
    recipesList = infoData;
    console.log("six", infoData);
    recipeRender(infoData)

    const instructionsUrl = new URL(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`);
    const instructionsResponse = await fetch(instructionsUrl);
    const instructionsData = await instructionsResponse.json();

    recipeRender(infoData, instructionsData);
}

const render=()=>{
    let recipeHTML = ``;
    recipeHTML = recipesList.map(
        recipe=>`<div class="col-md-3 col-sm-6 text-center">        
        <a href="#tag2" onclick='getInfo(${recipe.id})'>
            <img src=${recipe.image} class="menu-images">
            <h4>${recipe.title}</h4>
        </a>            
    </div>`).join('');
    document.getElementById('recipe-board').innerHTML=recipeHTML;
}

const searchRender=()=>{
    let recipeHTML = ``;
    recipeHTML = recipesList.map(
        recipe=>`<div class="col-md-3 col-sm-6 text-center">        
        <div class="recipe-info">
            <img src=${recipe.image} class="menu-images">
            <h4>${recipe.title}</h4>        
        </div>            
    </div>`).join('');
    document.getElementById('search-board').innerHTML=recipeHTML;
}



const recipeRender = (infoData, instructionsData) => {
    const { title, image, summary, winePairing } = infoData;
        const pairingText = winePairing ? winePairing.pairingText : "N/A";

        let recipeHTML = `<div class="row info-area">
            <div class="col-lg-6" name="tag2">
                <p style="font-size:30px;" class="text-center">${title}</p>
                <div><img src="${image}" style="width:100%;"></div>
            </div>
            <div class="col-lg-6">
                <div><b>Summary</b> : ${summary}</div>
                <div class="mt-5"><b>Wine Pairing</b> : ${pairingText}</div>
            </div>
        </div>`;

        if (instructionsData && instructionsData.length > 0) {
            const steps = instructionsData[0].steps;
            recipeHTML += `<div><b>Instructions</b>:</div>`;
            steps.forEach(stepObj => {
                recipeHTML += `<div>Step ${stepObj.number}: ${stepObj.step}</div>`;
            });
        }

        document.getElementById('recipe-board').innerHTML = recipeHTML;
}

// const recipeRender=(infoData, instructionsData)=>{
//     const { title, image, summary, winePairing } = infoData;
//     const { steps } = instructionsData[0];
//     const pairingText = winePairing.pairingText;
    
//     steps.forEach(stepObj => {
//         console.log(`Step ${stepObj.number}: ${stepObj.step}`);
//     });
//     let recipeHTML = `<div class="row info-area">
//     <div class="col-lg-6" name="tag2">
//       <p style="font-size:30px;" class="text-center">${title}</p>
//       <div><img src="${image}" style="width:100%;"></div>
//     </div>
//     <div class="col-lg-6">
//       <div><b>Summary</b> : ${summary}</div>
//       <div class="mt-5"><b>Wine Pairing</b> : ${pairingText}</div>
//     </div>
//   </div>`;
//     document.getElementById('recipe-board').innerHTML=recipeHTML;
// }


// const getInstructions = async (recipeId) => {
//     const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=4a1471f63a0a4ef081c3a604886e6ac4`);
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("one", data)
//     displayInstructions(data);
// }

// // 출력 함수
// const displayInstructions = (data) => {
//     const instructions = data[0].steps;
    
//     instructions.forEach((stepObj) => {
//         console.log(`Step ${stepObj.number}: ${stepObj.step}`);
//     });
//     console.log("aaa", instructions)
// }

// // 사용 예시: recipeId에는 원하는 레시피의 ID를 넣어주면 됩니다.
// getInstructions();

getRecipe()
