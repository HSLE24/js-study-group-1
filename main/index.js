const API_KEY = `4a1471f63a0a4ef081c3a604886e6ac4`;
let recipesList = [];
const category = document.querySelectorAll('.nation-category button')

category.forEach(category=>category.addEventListener("click",(event)=>
recipesByCategory(event)))

console.log("aaasd", category)

const getRecipe=async()=>{
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=9`);
    
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data.recipes;
    render();
    console.log("shit", data)
}

const recipesByCategory=async(event)=>{
    const quisine = event.target.textContent;
    console.log("dddddi", quisine);
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&quisine=${quisine}&number=9`)
    const response = await fetch(url);
    const data = await response.json();
    recipesList = data.recipes;
    render();
}

const render=()=>{
    let recipeHTML = ``;
    recipeHTML = recipesList.map(
        recipe=>`<div class="col-md-4 text-center">        
        <a href="#">
            <img src=${recipe.image} class="menu-images">
            <h4>${recipe.title}</h4>        
        </a>            
    </div>`).join('');
    document.getElementById('recipe-board').innerHTML=recipeHTML;
}


getRecipe()
// const API_KEY = "4a1471f63a0a4ef081c3a604886e6ac4"
// let info = []

// const getAPIData = async () => {
//     const url = new URL(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=pasta&maxFat=25&number=2`
//     );

//     const response = await fetch(url);
//     const APIdata = await response.json();

//     console.log(APIdata)
    
//     info = APIdata.results

//     render();
// }

// function render(){
//     let resultHTML = '';

//     for (let i = 0; i < info.length; i++){
//         resultHTML += `
//             <div id="${info[i].id}">
//                 <div>TITLE: ${info[i].title}</div>
//                 <img src="${info[i].image}" class="food-img">
//             </div>
//         `
//     }

//     document.getElementById("food-list").innerHTML = resultHTML;

// }

//getAPIData();
