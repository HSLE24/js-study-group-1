const API_KEY_recipe = "e680e552a20847d39488f4cdf0df7c0c"
// main.js 파일
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// 값을 가져오기
const recipeId = urlParams.get('id');
console.log(recipeId);

const recipeTitleElement = document.getElementById('recipeTitle');
const recipeImageElement = document.getElementById('recipeImage');
const recipeInstruction = document.getElementById('instruction');
const recipeDescription = document.getElementById('description');
const clickedIngredient = document.getElementById('ingredient-btn')
const showIngredient = document.getElementById('show-ingredient')




// 레시피 소개 버튼 들고오기
const clickedRecipeintro = document.getElementById('recipe-btn')
const showRecipeIntro = document.getElementById('show-recipeIntro')

// how to cook 들고오기

const instruction = document.querySelectorAll('.showInstruction')




clickedIngredient.addEventListener("click", function(){
  showIngredient.classList.toggle('toggleShow-Ingredient');
})


clickedRecipeintro.addEventListener("click", function(){
   showRecipeIntro.classList.toggle('toggleShow-recipeIntro')
} )





// API 요청 URL 생성
const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY_recipe}`;

// API 요청 보내기
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 상태가 좋지 않습니다. 다시 시도해주세요.');
    }
    return response.json();
  })
  .then(data => {
    // 응답 데이터 처리
    recipeTitleElement.textContent = data.title;
    recipeImageElement.src = data.image;

    

    console.log(data)
  })
  .catch(error => {
    console.error('API 요청 중 오류가 발생했습니다:', error);
  });

// getDishInformation


fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY_recipe}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 상태가 좋지 않습니다. 다시 시도해주세요.');
    }
    return response.json();
  })
  .then(data => {
    // 요리 설명 가져오기
    const ingredients = data.extendedIngredients;
    ingredients.forEach(ingredient => {

        const ingredientElement = document.createElement('li');
        ingredientElement.textContent = ingredient.original

        const ingredientsList = showIngredient;

        ingredientsList.appendChild(ingredientElement);

        const summaryRecipe = data.summary;
        showRecipeIntro.innerHTML = summaryRecipe;    

    })
    



    // 요리 설명을 UI에 표시하거나 다른 작업에 활용할 수 있습니다.
  })
  .catch(error => {
    console.error('API 요청 중 오류가 발생했습니다:', error);
  });