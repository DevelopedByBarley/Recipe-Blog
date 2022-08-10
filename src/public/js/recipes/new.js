
document.querySelector('.sendRecipesForm').onkeypress = function (e) {
  var key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
}


let ingredientsContainer = document.getElementById('ingredients-container')
let addIngredients = document.getElementById('addIngredients');
let removeIngredients = document.getElementById('removeIngredients');
let ingredients = document.getElementById('ingredients')
addIngredients.addEventListener('click', (event) => {
  event.preventDefault();
  let clone = ingredients.cloneNode(true);
  clone.value = '';
  ingredientsContainer.appendChild(clone);

})

removeIngredients.addEventListener('click', (event) => {
  event.preventDefault();
  ingredientsContainer.removeChild(ingredientsContainer.lastChild)
})

let stepsContainer = document.getElementById('steps-container');
let steps = document.getElementById('steps');
let addSteps = document.getElementById('addSteps');
let removeSteps = document.getElementById('removeSteps');

addSteps.addEventListener('click', (event) => {
  event.preventDefault();
  let clone = steps.cloneNode(true);
  clone.value = '';
  stepsContainer.appendChild(clone);
})

removeSteps.addEventListener('click', (event) => {
  event.preventDefault();
  stepsContainer.removeChild(stepsContainer.lastChild);
})
