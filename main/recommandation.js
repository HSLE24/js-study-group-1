const API_KEY_rec = "e680e552a20847d39488f4cdf0df7c0c"

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
                <a href="./recipe.html?id=${veganMenuData[i].id}"><img src="${veganMenuData[i].image}" href="./recipe.html?id=${veganMenuData[i].id}" title=${veganMenuData[i].title}></a>
                <div class="VeganMenu-caption">
                    <a href="./recipe.html?id=${veganMenuData[i].id}"><p>${veganMenuData[i].title}</p></a>
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
            <a href="./recipe.html?id=${glutenFreeData[i].id}"><img src="${glutenFreeData[i].image}" title=${glutenFreeData[i].title}></a>
                <div class="VeganMenu-caption">
                    <a href="./recipe.html?id=${glutenFreeData[i].id}"><p>${glutenFreeData[i].title}</p></a>
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
            <a href="./recipe.html?id=${dessertMenu[i].id}"><img src="${dessertMenu[i].image}" title=${dessertMenu[i].title}></a>
                <div class="VeganMenu-caption">
                    <a href="./recipe.html?id=${dessertMenu[i].id}"><p>${dessertMenu[i].title}</p></a>
                </div>
            </div>
            `
        renderCnt = renderCnt + 1;
    }

    document.getElementById("dessert-list").innerHTML = resultHTML;
}

getRecommendationMenuData()