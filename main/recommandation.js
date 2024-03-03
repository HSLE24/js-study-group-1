const API_KEY_rec = "7dccf51e73e141d3844446d0dabc01f1"

let veganMenuData = []
let glutenFreeData = []
let dessertMenu = []
let imgCnt = 3;

const getRecommendationMenuData = async () => {

    try{
        let url = new URL(
            `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY_rec}&number=6&include-tags=vegetarian`
        );

        let response = await fetch(url);//'../src/data/veganMenu.json'
        let APIdata = await response.json();

        veganMenuData = APIdata.recipes;

        if (response.status === 200){
            renderVeganMenu();
        }
        else {
            throw new Error(data.message)
        }
        if (veganMenuData.length < 1){
            throw new Error("No matches for your search")
        }

        url = new URL(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_rec}&number=6&intolerances=gluten`
        );

        response = await fetch(url);//'../src/data/glutenFreeMenu.json'
        APIdata = await response.json();

        glutenFreeData = APIdata.results;

        if (response.status === 200){
            renderGlutenFreeMenu();
        }
        else {
            throw new Error(data.message)
        }
        if (veganMenuData.length < 1){
            throw new Error("No matches for your search")
        }

        url = new URL(
            `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY_rec}&number=6&include-tags=dessert`
        );

        response = await fetch(url);//'../src/data/dessertMenu.json'
        APIdata = await response.json();

        dessertMenu = APIdata.recipes;

        if (response.status === 200){
            renderDessertMenu();
        }
        else {
            throw new Error(data.message)
        }
        if (veganMenuData.length < 1){
            throw new Error("No matches for your search")
        }
    }
    catch(error){
        let resultHTML = `
            <div class="alert alert-danger" role="alert">
                ${error.message}
            </div>
        `;
        document.getElementById("Menu-group-div").innerHTML = resultHTML;
    }
}

function renderVeganMenu(){
    let resultHTML = "";
    let renderCnt = 0;

    for (let i = 0; i < veganMenuData.length; i++){ 
        if (renderCnt >= 3) {
            break; // 이미 3개의 이미지를 렌더링했으므로 반복 중단
        }
        if ((veganMenuData[i].image === null || veganMenuData[i].image === undefined) && i != veganMenuData.length - 1){
            continue;
        }
        resultHTML += `
            <div class="VeganMenu-item VeganMenu-item-chile-${i}">
                <a href="#tag2" onclick='getInfo("vegan-recipe-board", ${veganMenuData[i].id})'><img src="${veganMenuData[i].image}" href="./recipe.html?id=${veganMenuData[i].id}" title=${veganMenuData[i].title}></a>
                <div class="VeganMenu-caption">
                    <a href="#tag2" onclick='getInfo("vegan-recipe-board", ${veganMenuData[i].id})'><p>${veganMenuData[i].title}</p></a>
                </div>
            </div>
            `
        renderCnt = renderCnt + 1;
    }

    document.getElementById("veganMenu-list").innerHTML = resultHTML;
}

function renderGlutenFreeMenu(){
    let resultHTML = "";
    let renderCnt = 0;

    for (let i = 0; i < glutenFreeData.length; i++){ //veganMenuData.length
        if (renderCnt >= 3) {
            break; // 이미 3개의 이미지를 렌더링했으므로 반복 중단
        }
        if ((glutenFreeData[i].image === null || glutenFreeData[i].image === undefined) && i != glutenFreeData.length - 1){
            continue;
        }
        resultHTML += `
            <div class="VeganMenu-item VeganMenu-item-chile-${i}">
            <a href="#tag2" onclick='getInfo("gluten-free-recipe-board", ${glutenFreeData[i].id})'><img src="${glutenFreeData[i].image}" title=${glutenFreeData[i].title}></a>
                <div class="VeganMenu-caption">
                    <a href="#tag2" onclick='getInfo("gluten-free-recipe-board", ${glutenFreeData[i].id})'><p>${glutenFreeData[i].title}</p></a>
                </div>
            </div>
            `
        renderCnt = renderCnt + 1;
    }

    document.getElementById("gluten-free-list").innerHTML = resultHTML;
}

function renderDessertMenu(){
    let resultHTML = "";
    let renderCnt = 0;

    for (let i = 0; i < dessertMenu.length; i++){ //veganMenuData.length
        if (renderCnt >= 3) {
            break; // 이미 3개의 이미지를 렌더링했으므로 반복 중단
        }
        if ((dessertMenu[i].image === null || dessertMenu[i].image === undefined) && i != dessertMenu.length - 1){
            continue;
        }
        resultHTML += `
            <div class="VeganMenu-item VeganMenu-item-chile-${i}">
            <a href="#tag2" onclick='getInfo("dessert-recipe-board", ${dessertMenu[i].id})'><img src="${dessertMenu[i].image}" title=${dessertMenu[i].title}></a>
                <div class="VeganMenu-caption">
                    <a href="#tag2" onclick='getInfo("dessert-recipe-board", ${dessertMenu[i].id})'><p>${dessertMenu[i].title}</p></a>
                </div>
            </div>
            `
        renderCnt = renderCnt + 1;
    }

    document.getElementById("dessert-list").innerHTML = resultHTML;
}

getRecommendationMenuData()


//index.js 코드 활용

let recipesList = [];

const getInfo=async(divId, id)=>{
    const infoUrl = new URL(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_rec}`);
    console.log("four", infoUrl)
    const response = await fetch(infoUrl);
    const infoData = await response.json();
    recipesList = infoData;
    console.log("six", infoData);
    recipeRender(divId, infoData)

    const instructionsUrl = new URL(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY_rec}`);
    const instructionsResponse = await fetch(instructionsUrl);
    const instructionsData = await instructionsResponse.json();

    recipeRender(divId, infoData, instructionsData);
}

const recipeRender = (divId, infoData, instructionsData) => {
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
            <div class="mt-5" style="text-align:left;"><b>Summary</b> : ${summary}</div>
            <div class="mt-3 text-center">
                <button class="toggle-button" onclick="toggleIngredients(${id})">Ingredients</button>
                <button class="toggle-button" onclick="toggleInstructions(${id})">Instructions</button>
                <button class="toggle-button" onclick="toggleWinePairing(${id})">Wine Pairing</button>
            </div>
        </div>
        <div class="col-lg-12">
            <div id="ingredients-${id}" class="recipe-text-align"><b>Ingredients</b>: ${ingredientsList}</div>
            <div id="instructions-${id}" class="recipe-text-align"><b>Instructions</b>: ${instructionsList}</div>
            <div id="wine-pairing-${id}" class="recipe-text-align"><b>Wine Pairing</b>: ${pairingText}</div>
        </div>
    </div>
    <div class="interval"></div>`;

    document.getElementById(divId).innerHTML = recipeHTML;
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