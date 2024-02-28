const API_KEY = 'ba5d7061db304fe696dfea7c181fb9ab';
const recipeId = 716429; // 레시피 ID

// HTML 요소 찾기
const recipeTitleElement = document.getElementById('recipeTitle');
const recipeImageElement = document.getElementById('recipeImage');
const recommendationImages = document.querySelectorAll('.recommandation img');

// Spoonacular API를 사용하여 데이터 가져오기
fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('API 요청 중 문제가 발생했습니다.');
    }
    return response.json();
  })
  .then(data => {
    // 레시피 제목과 이미지 추가
    recipeTitleElement.textContent = data.title;
    recipeImageElement.src = data.image;
  })
  .catch(error => {
    console.error('API 요청 중 오류가 발생했습니다:', error);
  });

// 비슷한 레시피 이미지 가져오기
fetch(`https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('API 요청 중 문제가 발생했습니다.');
    }
    return response.json();
  })
  .then(data => {
    // 추천 레시피 이미지 추가
    data.slice(0, 2).forEach((recipe, index) => {
      recommendationImages[index].src = recipe.image;
      recommendationImages[index].alt = recipe.title;
      console.log(data)
    });
  })
  .catch(error => {
    console.error('API 요청 중 오류가 발생했습니다:', error);
  });