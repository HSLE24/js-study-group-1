const API_KEY = ""//"e680e552a20847d39488f4cdf0df7c0c"
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

const getRecommendationMenuData = async () => {

    let url = new URL(
         `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6&exclude-tags=vegetarian`
    );

    let response = await fetch('../src/data/todayMenu.json');//
    let APIdata = await response.json();

    todayMenuData = APIdata.recipes;
    
    renderTodayMenu();
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

    const url = new URL(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${selectedCuisine}&number=40`
    );

    const response = await fetch('../src/data/categoryMenu.json');
    const APIdata = await response.json();

    categoryMenuData = APIdata.results;

    let resultHTML = "";

    for (let i = 0; i < categoryMenuData.length; i++){
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

getRecommendationMenuData();
renderCategoryMenu(selectedCuisine);