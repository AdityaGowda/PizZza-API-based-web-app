var recipeContainer=document.querySelector('.recipe');
var sidebar= document.querySelector('.results');

const icons= `./src/img/icons.svg`;
var text1
const state={
  search:{
    query:'',
    result:[],
    }
}



const showRecipeUsingAPI=async function(){
    try{
    const id=window.location.hash.slice(1);
     const apiFetch=  await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
     const dataOfAPI= await apiFetch.json();
     console.log(dataOfAPI);
     let {recipe} =dataOfAPI.data;
     recipe={
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        srcUrl:recipe.source_url,
        image:recipe.image_url,
        serving:recipe.servings,
        cookingTime:recipe.cooking_time,
        ingredient:recipe.ingredients,
     }
     console.log(recipe);

    const markup=`<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${
  recipe.title
}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="./src/img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">min</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="./src/img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.serving
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
            recipe.servings - 1
        }">
          <svg>
            <use href="./src/img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          recipe.servings + 1
        }">
          <svg>
            <use href="./src/img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated>
      <svg>
        <use href="./src/img/icons.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">

      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${recipe.ingredient.map(e=>{return`<li class="recipe__ingredient">
    <div class="recipe__quantity">${e.quantity}</div>
    <div class="recipe__description">
    <span class="recipe__unit">${e.unit}</span>
    ${e.description} </div>
    </li>
    `;
  }).join('')}
      </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.srcUrl}"
      target="_blank"
    >
      <span>Directions</span>
    </a>
  </div>`;
console.log(recipe);
document.querySelector(".recipe").innerHTML="";
document.querySelector('.recipe').insertAdjacentHTML('afterbegin',markup);

  
}catch(e){
        console.log(e);
    }
    
    }


    //search bar

    const searchLoad=async function(query)
    {
      try{
        state.search.query=query;
        const load=  await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
        const loadSearch= await load.json();
        console.log(loadSearch);
      state.search.result=loadSearch.data.recipes.map(function(r){
        return{
          id:r.id,
          title:r.title,
          publisher:r.publisher,
          image:r.image_url,
         } 
        
       });
      }
      catch(er){
        console.log(er);
      }
    }

    
const controlSearchResult=async function(texts)
{
  try{
    var query=texts;
     if(!query)return;
   await searchLoad(query)
   console.log(state.search.result);

   
var genmarkup=state.search.result.map(function(e){  return `<li class="preview">
<a class="preview__link preview__link--active" href="#${e.id}" id="listid">
<figure class="preview__fig">
  <img src="${e.image}" alt="Test" />
</figure>
<div class="preview__data">
  <h4 class="preview__title">${e.title}</h4>
  <p class="preview__publisher">${e.publisher}</p>
</div>
</a>
</li>`})

sidebar.insertAdjacentHTML("beforeend",genmarkup)
     d.value=''; 
  }
  catch(e){
    console.log(e);
  }
}    

window.onhashchange=function(){
  showRecipeUsingAPI()
}
  
    function home(){
      text1=d.value;
      sidebar.innerHTML='';
      controlSearchResult(text1)
      }
      
      const d=document.querySelector('.search__field');
      let button1=document.getElementById('but');
      button1.addEventListener("click",home)
      console.log(sidebar);
      console.log(state.search.result);
      
