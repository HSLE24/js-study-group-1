const getVegifood=async()=>{
    const url = new URL(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4a1471f63a0a4ef081c3a604886e6ac4&cuisine=korean`);
    
    const response = await fetch(url)
    const data = await response.json()
    console.log("aaa", data)
}

getVegifood()
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
