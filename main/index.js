const API_KEY = "e680e552a20847d39488f4cdf0df7c0c"// `4a1471f63a0a4ef081c3a604886e6ac4`;
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

const getInfo2=async(id)=>{
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

    recipeRender2(infoData, instructionsData);
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
        <a href="#tag1" onclick='getInfo2(${recipe.id})'>
            <img src=${recipe.image} class="menu-images">
            <h4>${recipe.title}</h4>        
        </a>            
    </div>`).join('');
    document.getElementById('search-board').innerHTML=recipeHTML;
}


const recipeRender = (infoData, instructionsData) => {
    const { id, title, image, summary, winePairing, extendedIngredients } = infoData;
    const pairingText = winePairing ? winePairing.pairingText : "N/A";

    let ingredientsList = "<ul>";
    extendedIngredients.forEach(ingredient => {
        ingredientsList += `<li>${ingredient.original}</li>`;
    });
    ingredientsList += "</ul>";

    let instructionsList = "";
    if (instructionsData && instructionsData.length > 0) {
        instructionsList = "<ol>";
        instructionsData[0].steps.forEach(step => {
            instructionsList += `<li>${step.step}</li>`;
        });
        instructionsList += "</ol>";
    } else {
        instructionsList = "Instructions not available.";
    }

    let recipeHTML = `<div class="row info-area">
        <div class="col-lg-12" name="tag2">
            <p style="font-size:30px;" class="text-center">${title}</p>
            
            <div><img src="${image}" style="width:100%;"></div>
            <div class="mt-5"><b>Summary</b> : ${summary}</div>
            <div class="mt-3 text-center">
                <button class="toggle-button" onclick="toggleIngredients(${id})">Ingredients</button>
                <button class="toggle-button" onclick="toggleInstructions(${id})">Instructions</button>
                <button class="toggle-button" onclick="toggleWinePairing(${id})">Wine Pairing</button>
            </div>
        </div>
        <div class="col-lg-12">
            <div id="ingredients-${id}" style="display: none;"><b>Ingredients</b>: ${ingredientsList}</div>
            <div id="instructions-${id}" style="display: none;"><b>Instructions</b>: ${instructionsList}</div>
            <div id="wine-pairing-${id}" style="display: none;"><b>Wine Pairing</b>: ${pairingText}</div>
        </div>
    </div>`;

    document.getElementById('recipe-board').innerHTML = recipeHTML;
}

// Toggle functions for each section
const toggleIngredients = (id) => {
    const ingredientsSection = document.getElementById(`ingredients-${id}`);
    ingredientsSection.style.display = ingredientsSection.style.display === 'none' ? 'block' : 'none';
}

const toggleInstructions = (id) => {
    const instructionsSection = document.getElementById(`instructions-${id}`);
    instructionsSection.style.display = instructionsSection.style.display === 'none' ? 'block' : 'none';
}

const toggleWinePairing = (id) => {
    const winePairingSection = document.getElementById(`wine-pairing-${id}`);
    winePairingSection.style.display = winePairingSection.style.display === 'none' ? 'block' : 'none';
}

function toggleElement() {
    var element = document.getElementById("toggle-element");
    element.classList.toggle("hidden");
}

getRecipe()
