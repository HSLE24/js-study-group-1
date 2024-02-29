const API_KEY = `4a1471f63a0a4ef081c3a604886e6ac4`;
let recipesList = [];
const category = document.querySelectorAll('.nation-category button')

category.forEach(category=>category.addEventListener("click",(event)=>
recipesByCategory(event)))

console.log("aaasd", category)

const getRecipe=async()=>{
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=16`);
    
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data.results;
    render();
}

const recipesByCategory=async(event)=>{
    const cuisine = event.target.textContent;
    console.log("dddddi", cuisine);
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&number=16`)
    const response = await fetch(url);
    const data = await response.json();
    console.log("six", data)
    recipesList = data.results;
    render();
}

const getRecipeByKeyword=async()=>{
    const keyword = document.getElementById('search-input').value;
    console.log("keyword", keyword)
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${keyword}&number=16`)
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data.results;
    searchRender();
}

const render=()=>{
    let recipeHTML = ``;
    recipeHTML = recipesList.map(
        recipe=>`<div class="col-md-3 col-sm-6 text-center">        
        <a href="#">
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
        <a href="#">
            <img src=${recipe.image} class="menu-images">
            <h4>${recipe.title}</h4>        
        </a>            
    </div>`).join('');
    document.getElementById('search-board').innerHTML=recipeHTML;
}

getRecipe()
