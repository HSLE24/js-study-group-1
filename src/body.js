const API_KEY_body = "e680e552a20847d39488f4cdf0df7c0c"
let info = []
let todayMenuData = []
let veganMenuData = []
let categoryMenuData = []
let todaysCuisine = []
let imgCnt = 4;
const cuisine = ["African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European",
    "European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean",
    "Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"] // 임시
let selectedCuisine = "Korean"
let recipesList = [];

document.addEventListener("keypress", handleEnterKeyPress)

function handleEnterKeyPress(event){
    const keyword = document.getElementById('search-input').value;

    if (event.which === 13 || event.keyCode === 13){
        if (keyword != null && keyword != undefined && keyword.value != ""){
            getRecipeByKeyword();
        }
    }
}

const getRecipeByKeyword=async()=>{
    const keyword = document.getElementById('search-input').value;

    try{
        const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_body}&query=${keyword}&number=16`)
        const response = await fetch('../src/data/searchMenu.json');//
        const data = await response.json();
        console.log(data);

        recipesList = data.results;

        if (response.status === 200){
            searchRender();
        }
        else {
            throw new Error(data.message)
        }
        if (recipesList.length < 1){
            throw new Error("No matches for your search")
        }
    }
    catch(error){
        let resultHTML = `
            <div class="alert alert-danger" role="alert">
                ${error.message}
            </div>
        `;
        document.getElementById('search-board').innerHTML = resultHTML;
    }
}

const searchRender=()=>{
    let recipeHTML = ``;
    recipeHTML = recipesList.map(
        recipe=>`
            <div class="categoryMenu-item-box">
                <div class="categoryMenu-item">
                    <img src="${recipe.image}" href="./recipe.html?id=${recipe.id}" title=${recipe.title}>
                </div>
                <p class="categoryMenu-title" href="#">${recipe.title}</p>
            </div>
    `).join('');
    document.getElementById('search-board').innerHTML=recipeHTML;
}

const getRecommendationMenuData = async () => {
    
    try{
        let url = new URL(
            `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY_body}&number=6&exclude-tags=vegetarian`
        );

        let response = await fetch('../src/data/todayMenu.json');//
        let APIdata = await response.json();

        todayMenuData = APIdata.recipes;
        
    
        if (response.status === 200){
            renderTodayMenu();
        }
        else {
            throw new Error(data.message)
        }
        if (todayMenuData.length < 1){
            throw new Error("No matches for your search")
        }
    }
    catch(error){

        let resultHTML = `
        <div class="alert alert-danger" role="alert">
            ${error.message}
        </div>
        `;
        document.getElementById("RecommendationMen-list").innerHTML = resultHTML;
    }
}

function renderTodayMenu(){
    let resultHTML = "";

    for (let i = 0; i < 4; i++){ //veganMenuData.length
        if (i === 0){
            resultHTML += `
                <div class="RecommendationMenu-item Menu-item-child-${i}">
                    <img src="${todayMenuData[i].image}" href="./recipe.html?id=${todayMenuData[i].id}" title=${todayMenuData[i].title}>
                </div>
            `
        }
        else if (i === 3){
            resultHTML += `
                <div class="RecommendationMenu-item-last Menu-item-child-${i}">
                    <img src="${todayMenuData[i].image}" href="./recipe.html?id=${todayMenuData[i].id}" title=${todayMenuData[i].title}>
                </div>
            `
        }
        else {
            resultHTML += `
                <div class="RecommendationMenu-item Menu-item-child-${i}">
                    <img src="${todayMenuData[i].image}" href="./recipe.html?id=${todayMenuData[i].id}" title=${todayMenuData[i].title}>
                </div>
            `
        }
    }

    document.getElementById("RecommendationMen-list").innerHTML = resultHTML;
}

function renderCategoryNavbar(){

    let resultHTML = "";

    for (let i = 0; i < cuisine.length; i++){
        if (cuisine[i] === selectedCuisine){
            resultHTML += `
                <li class="categoryMenu-nav-item selected-Cuisine" onclick="renderCategoryMenu('${cuisine[i]}')">${cuisine[i]}</li>
            `
        }
        else {
            resultHTML += `
                <li class="categoryMenu-nav-item" onclick="renderCategoryMenu('${cuisine[i]}')">${cuisine[i]}</li>
            `
        }
    }

    document.getElementById("categoryMenu-navbar").innerHTML = resultHTML;
}

const renderCategoryMenu = async (selectedCuisine_temp) => {

    selectedCuisine = selectedCuisine_temp;
    try{
            
        const url = new URL(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_body}&cuisine=${selectedCuisine}&number=40`
        );

        const response = await fetch('../src/data/categoryMenu.json');//
        const APIdata = await response.json();

        categoryMenuData = APIdata.results;
        
        if (response.status === 200){
            let resultHTML = "";

            for (let i = 0; i < 24; i++){
                resultHTML += `
                    <div class="categoryMenu-item-box">
                        <div class="categoryMenu-item">
                            <img src="${categoryMenuData[i].image}" href="./recipe.html?id=${categoryMenuData[i].id}" title=${categoryMenuData[i].title}>
                        </div>
                        <p class="categoryMenu-title" href="#">${categoryMenuData[i].title}</p>
                    </div>
                    `
            }

            document.getElementById("categoryMenu-list").innerHTML = resultHTML;

            renderCategoryNavbar();
        }
        else {
            throw new Error(data.message)
        }
        if (categoryMenuData.length < 1){
            throw new Error("No matches for your search")
        }
    }
    catch(error){

        let resultHTML = `
        <div class="alert alert-danger" role="alert">
            ${error.message}
        </div>
        `;
        document.getElementById("categoryMenu-list").innerHTML = resultHTML;
    }
    
}

getRecommendationMenuData();
renderCategoryMenu(selectedCuisine);