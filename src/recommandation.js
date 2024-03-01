const API_KEY = ""//"e680e552a20847d39488f4cdf0df7c0c"
let veganMenuData = []
let glutenFreeData = []
let dessertMenu = []

const getRecommendationMenuData = async () => {

    let url = new URL(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=3&include-tags=vegetarian`
    );

    let response = await fetch('../src/data/veganMenu.json');
    let APIdata = await response.json();

    veganMenuData = APIdata.recipes;

    renderVeganMenu();

    url = new URL(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=3&intolerances=gluten`
    );

    response = await fetch('../src/data/glutenFreeMenu.json');
    APIdata = await response.json();

    glutenFreeData = APIdata.results;

    renderGlutenFreeMenu();

    url = new URL(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=3&include-tags=dessert`
    );

    response = await fetch('../src/data/dessertMenu.json');
    APIdata = await response.json();

    console.log(APIdata)

    dessertMenu = APIdata.recipes;

    renderDessertMenu();
}

function renderVeganMenu(){
    let resultHTML = "";

    for (let i = 0; i < 3; i++){ //veganMenuData.length
        resultHTML += `
            <div class="VeganMenu-item VeganMenu-item-chile-${i}">
                <img src="${veganMenuData[i].image}" href="./recipe.html?id=${veganMenuData[i].id}" title=${veganMenuData[i].title}>
                <div class="VeganMenu-caption">
                    <p href="#">${veganMenuData[i].title}</p>
                </div>
            </div>
            `
    }

    document.getElementById("veganMenu-list").innerHTML = resultHTML;
}

function renderGlutenFreeMenu(){
    let resultHTML = "";

    for (let i = 0; i < 3; i++){ //veganMenuData.length
        resultHTML += `
            <div class="VeganMenu-item VeganMenu-item-chile-${i}">
                <img src="${glutenFreeData[i].image}" href="./recipe.html?id=${glutenFreeData[i].id}" title=${glutenFreeData[i].title}>
                <div class="VeganMenu-caption">
                    <p href="#">${glutenFreeData[i].title}</p>
                </div>
            </div>
            `
    }

    document.getElementById("gluten-free-list").innerHTML = resultHTML;
}

function renderDessertMenu(){
    let resultHTML = "";

    for (let i = 0; i < 3; i++){ //veganMenuData.length
        resultHTML += `
            <div class="VeganMenu-item VeganMenu-item-chile-${i}">
                <img src="${dessertMenu[i].image}" href="./recipe.html?id=${dessertMenu[i].id}" title=${dessertMenu[i].title}>
                <div class="VeganMenu-caption">
                    <p href="#">${dessertMenu[i].title}</p>
                </div>
            </div>
            `
    }

    document.getElementById("dessert-list").innerHTML = resultHTML;
}

getRecommendationMenuData()