const API_KEY = ""//"e680e552a20847d39488f4cdf0df7c0c"
let info = []
let todayMenuData = []
let veganMenuData = []
let imgCnt = 5;

const getAPIData = async () => {
    const url = new URL(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=pasta&maxFat=25&number=2`
    );

    const response = await fetch(url);
    const APIdata = await response.json();

    console.log(APIdata)
    
    info = APIdata.results

    render();
}

function render(){
    let resultHTML = '';

    for (let i = 0; i < info.length; i++){
        resultHTML += `
            <div id="${info[i].id}">
                <div>TITLE: ${info[i].title}</div>
                <img src="${info[i].image}" class="food-img">
            </div>
        `
    }

    document.getElementById("food-list").innerHTML = resultHTML;

}

//getAPIData();

const getRecommendationMenuData = async () => {

    let url = new URL(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=5&exclude-tags=vegetarian`
    );

    let response = await fetch(url);
    let APIData = await response.json();

    todayMenuData = APIData.recipes;
    
    renderTodayMenu();

    url = new URL(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=5&include-tags=vegetarian`
    );

    response = await fetch(url);
    APIData = await response.json();

    veganMenuData = APIData.recipes;

    renderVeganMenu();
}

function renderTodayMenu(){
    let resultHTML = "";

    for (let i = 0; i < todayMenuData.length; i++){
        resultHTML += `
                <img class="RecommendationMenu-item" src="${todayMenuData[i].image}" href="./recipe.html?id=${todayMenuData[i].id}" title=${todayMenuData[i].title}>
        `
    }

    document.getElementById("todayMenu-list").innerHTML = resultHTML;
}


function renderVeganMenu(){
    let resultHTML = "";

    for (let i = 0; i < veganMenuData.length; i++){
        resultHTML += `
                <img class="RecommendationMenu-item" src="${veganMenuData[i].image}" href="./recipe.html?id=${veganMenuData[i].id}" title=${veganMenuData[i].title}>
        `
    }

    document.getElementById("veganMenu-list").innerHTML = resultHTML;
}

getRecommendationMenuData();