const API_KEY = ""
let info = [];
let todayMenuData = [];
let veganMenuData = [];
let categoryMenuData = [];
let todaysCuisine = [];
let imgCnt = 4;
const cuisine = ["African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European",
    "European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean",
    "Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]

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

// 오늘의 Cuisine 랜덤으로 4개 선정
function getTodaysCuisine(){

    let clonedArray = cuisine;
    todaysCuisine = [];

    for (let i = 0; i < imgCnt; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        
        todaysCuisine.push(clonedArray.splice(randomIndex, 1)[0]);
    }
}

// main body 이미지 생성
const getRecommendationMenuData = async () => {

    let url = new URL(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6&exclude-tags=vegetarian`
    );

    let response = await fetch(url);//'../src/data/todayMenu.json' CSS 테스트 시 API 횟수를 아끼기 위해 json 파일 사용
    let APIdata = await response.json();

    todayMenuData = APIdata.recipes;
    
    renderTodayMenu();

    url = new URL(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6&include-tags=vegetarian`
    );

    response = await fetch(url);//'../src/data/veganMenu.json'
    APIdata = await response.json();

    veganMenuData = APIdata.recipes;

    renderVeganMenu();

    for (let i = 0; i < todaysCuisine.length; i++){
        url = new URL(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${todaysCuisine[i]}&number=1`
        );
    
        response = await fetch(url);//url
        APIdata = await response.json();

        categoryMenuData.push(APIdata.results);
    }

    renderCategoryMenu();

}

function renderTodayMenu(){
    let resultHTML = "";

    for (let i = 0; i < todayMenuData.length; i++){
        resultHTML += `
            <div class="RecommendationMenu-item col-lg-2 col-md-4 col-sm-6">
                <img src="${todayMenuData[i].image}" href="./recipe.html?id=${todayMenuData[i].id}" title=${todayMenuData[i].title}>
                <div class="RecommendationMenu-caption">
                    <p href="#">${todayMenuData[i].title}</p>
                </div>
            </div>
            `
    }

    document.getElementById("todayMenu-list").innerHTML = resultHTML;
}

function renderVeganMenu(){
    let resultHTML = "";

    for (let i = 0; i < veganMenuData.length; i++){
        resultHTML += `
            <div class="RecommendationMenu-item col-lg-2 col-md-4 col-sm-6">
                <img src="${veganMenuData[i].image}" href="./recipe.html?id=${veganMenuData[i].id}" title=${veganMenuData[i].title}>
                <div class="RecommendationMenu-caption">
                    <p href="#">${veganMenuData[i].title}</p>
                </div>
            </div>
            `
    }

    document.getElementById("veganMenu-list").innerHTML = resultHTML;
}

function renderCategoryMenu(){
    let resultHTML = "";

    for (let i = 0; i < categoryMenuData.length; i++){
        resultHTML += `
            <div class="CategoryMenu-item col-lg-3 col-md-6 col-sm-12">
                <img src="${categoryMenuData[i][0].image}" href="./recipe.html?id=${categoryMenuData[i][0].id}" title=${categoryMenuData[i][0].title}>
                <div class="CategoryMenu-caption">
                    <h3>${todaysCuisine[i]}</h3>
                    <a href="#">View Detail</a>
                </div>
            </div>
            `
    }

    document.getElementById("categoryMenu-list").innerHTML = resultHTML;
}

getTodaysCuisine();
getRecommendationMenuData();