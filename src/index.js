const API_KEY2 = ""//"e680e552a20847d39488f4cdf0df7c0c";
let recipesList = [];

const getRecipeByKeyword=async()=>{
    const keyword = document.getElementById('search-input').value;

    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&query=${keyword}&number=16`)
    const response = await fetch('../src/data/searchMenu.json');
    const data = await response.json();
    console.log(data);

    recipesList = data.results;
    searchRender();
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
