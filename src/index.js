const API_KEY = `79596fb1d886465fa41e5fb88fa54f21`;
// const API_KEY = `4a1471f63a0a4ef081c3a604886e6ac4`; 휘호씨꺼
// const API_KEY = `75fffe6a3ca84052a5f814a0e58a0643`; 내꺼


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
    const url = new URL(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    console.log("four", url)
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data;
    console.log("six", data);
    recipeRender(data)
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





const recipeRender = (data) => {
    const { title, image, summary, winePairing } = data;
    const pairingText = winePairing.pairingText;
    let recipeHTML = `<div class="row info-area">
        <div class="col-lg-6" name="tag2">
            <p style="font-size:30px;" class="text-center">${title}</p>
            <div><img src="${image}" style="width:100%;"></div>
            <div class="mt-5"><b>Summary</b> : ${summary}</div>
        </div>
        <div class="col-lg-6">
            <div class="mt-5"><b>Ingredients</b> :</div>
            <ul>`;

    // 재료 목록을 순회하면서 리스트 항목을 추가합니다.
    data.extendedIngredients.forEach(ingredient => {
        recipeHTML += `<li>${ingredient.original}</li>`;
    });

    recipeHTML += `</ul>
            <div class="mt-5"><b>Wine Pairing</b> : ${pairingText}</div>
        </div>
    </div>`;

    document.getElementById('recipe-board').innerHTML = recipeHTML;
}

getRecipe()
