const API_KEY = ""//"b00bbb5eec1542ab82a2fd633b75c407"//"ba5d7061db304fe696dfea7c181fb9ab" //`4a1471f63a0a4ef081c3a604886e6ac4`;
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
    recipeRender2(infoData)

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
                <button class="toggle-button" onclick="toggleOtherRecommendedRecipes(${id})">Other Recipes</button>
            </div>
        </div>
        <div class="col-lg-12">
            <div id="ingredients-${id}" style="display: none;"><b>Ingredients</b>: ${ingredientsList}</div>
            <div id="instructions-${id}" style="display: none;"><b>Instructions</b>: ${instructionsList}</div>
            <div id="wine-pairing-${id}" style="display: none;"><b>Wine Pairing</b>: ${pairingText}</div>
            <div id="recommended-recipes-${id}" class="another-recommendation-area" style="display: none;">
                <p class="another-recommendation-title"><strong>Other Recommended Recipes</strong></p>
                <div class="recommendation-group">
                    <div class="recommendation-layer">
                        <img src="./image/waitaminute.JPG" alt="추천1" id="recommendationImage1">
                        <div id="recommendationName1">Anchovies Appetizer With Breadcrumbs & Scallions</div>
                    </div>
                    <div class="recommendation-layer">
                        <img src="./image/waitaminute.JPG" alt="추천2" id="recommendationImage2">
                        <div id="recommendationName2">Pasta With Cauliflower, Sausage, & Breadcrumbs</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('recipe-board').innerHTML = recipeHTML;
}

const recipeRender2 = (infoData, instructionsData) => {
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
                <button class="toggle-button" onclick="toggleOtherRecommendedRecipes(${id})">Other Recipes</button>
            </div>
        </div>
        <div class="col-lg-12">
            <div id="ingredients-${id}" style="display: none;"><b>Ingredients</b>: ${ingredientsList}</div>
            <div id="instructions-${id}" style="display: none;"><b>Instructions</b>: ${instructionsList}</div>
            <div id="wine-pairing-${id}" style="display: none;"><b>Wine Pairing</b>: ${pairingText}</div>
            <div id="recommended-recipes-${id}" class="another-recommendation-area" style="display: none;">
                <p class="another-recommendation-title"><strong>Other Recommended Recipes</strong></p>
                <div class="recommendation-group">
                    <div class="recommendation-layer">
                        <img src="./image/waitaminute.JPG" alt="추천1" id="recommendationImage1">
                        <div id="recommendationName1">Anchovies Appetizer With Breadcrumbs & Scallions</div>
                    </div>
                    <div class="recommendation-layer">
                        <img src="./image/waitaminute.JPG" alt="추천2" id="recommendationImage2">
                        <div id="recommendationName2">Pasta With Cauliflower, Sausage, & Breadcrumbs</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    document.getElementById('search-board').innerHTML = recipeHTML;
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

//이삭님 코드
const toggleOtherRecommendedRecipes = (recipeId) => {

    const recommendedRecipesSection = document.getElementById(`recommended-recipes-${recipeId}`);

    if (recommendedRecipesSection.style.display === 'none'){
        const recommendationImages = document.querySelectorAll(`#recommended-recipes-${recipeId} img`);

        fetch(`https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${API_KEY}`)
        .then(response => {
        if (!response.ok) {
            throw new Error('API 요청 중 문제가 발생했습니다.');
        }
        return response.json();
        })
        .then(data => {
        // 추천 레시피 이미지 추가
        data.slice(0, 2).forEach((recipe, index) => {
            const recommendationImageElement = recommendationImages[index]; // 이미지를 보여줄 요소
            const recommendationNameElement = document.getElementById(`recommendationName${index + 1}`); // 추천 레시피 이름을 표시할 요소
            fetch(`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`) // 이미지의 유형을 알고 있을 경우에는 확장자를 명시적으로 지정합니다.
            .then(response => {
                if (!response.ok) {
                throw new Error('이미지를 불러오는 중 문제가 발생했습니다.');
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                recommendationImageElement.src = imageUrl;
                recommendationNameElement.textContent = recipe.title;
            })
            .catch(error => {
                console.error('이미지를 불러오는 중 오류가 발생했습니다:', error);
            });
        });
        })
        .catch(error => {
        console.error('API 요청 중 오류가 발생했습니다:', error);
        });
    }

    recommendedRecipesSection.style.display = recommendedRecipesSection.style.display === 'none' ? 'block' : 'none';
}