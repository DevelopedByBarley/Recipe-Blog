

let title = document.getElementById('recipe-title');
let categorie = document.getElementById('categorie');
let portion = document.getElementById('portion');
let cost = document.getElementById('cost');
let difficult = document.getElementById('difficult');
let preparationTime = document.getElementById('preparationTime');
let cookDuration = document.getElementById('cookDuration');
let comment = document.getElementById('comment');
let updateRecipe = document.getElementById('update-recipe');


let ingredientsContainer = document.getElementById('ingredients-container')
let ingredientsBox = document.querySelector('.ingredients-box')
let addIngredients = document.getElementById('addIngredients');

let stepsContainer = document.getElementById('steps-container');
let stepsBox = document.querySelector('.steps-box');
let addSteps = document.getElementById('addSteps');


document.querySelector('.sendRecipesForm').onkeypress = function (e) {
  var key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
}


function renderIngredients() {
  let removeIngredients = document.querySelectorAll('.removeIngredients');
  for (let removeBtn of removeIngredients) {
    removeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.currentTarget.parentElement.remove();
    })
  }
}


addIngredients.addEventListener('click', (event) => {
  event.preventDefault();
  let clone = ingredientsBox.cloneNode(true);
  clone.childNodes[1].value= ""
  ingredientsContainer.appendChild(clone);
  renderIngredients();
})





function renderSteps() {
  let removeSteps = document.querySelectorAll('.removeSteps');
  for (let removeBtn of removeSteps) {
    removeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.currentTarget.parentElement.remove();
    })
  }
}


addSteps.addEventListener('click', (event) => {
  console.log(event.target)
  event.preventDefault();
  let clone = stepsBox.cloneNode(true);
  clone.childNodes[1].value= ""
  stepsContainer.appendChild(clone);
  
  renderSteps();
})




window.onload = renderIngredients()
window.onload = renderSteps()



let ingredientsArray = [];
let stepsArray = [];

updateRecipe.addEventListener('click', async (event) => {

  let ingredients = document.querySelectorAll('input[name="ingredients"]');
  let steps = document.querySelectorAll('input[name="steps"]');
  
  console.log(categorie.value);
  let id = event.target.dataset.id;

  event.preventDefault();

  for (let ingredient of ingredients) {
    ingredientsArray.push(ingredient.value)
  }

  for (let step of steps) {
    stepsArray.push(step.value)
  }


  let newUpdateRecipe = {
    title: title.value,
    categorie: categorie.value,
    portion: portion.value,
    cost: cost.value,
    difficult: difficult.value,
    preparationTime: Number(preparationTime.value),
    cookDuration: Number(cookDuration.value),
    title: title.value,
    comment: comment.value,
    ingredients: ingredientsArray,
    steps: stepsArray,
  }
  
  if(ingredients.length > 0 && steps.length > 0) {
    try {
      await fetch(`/recipes/recipe/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUpdateRecipe)
      })
      window.location.assign('/recipes')
    } catch (error) {
      window.location.assign('/')
      console.log(error);
    }
  } else {
    alert('Adj hozzá minimum 1 hozzávalót és 1 lépést')
  }

})

