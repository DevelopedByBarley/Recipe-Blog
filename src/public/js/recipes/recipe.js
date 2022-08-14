const ingredients = document.getElementById('ingredients')
const ingredientsMenu = document.getElementById('ingredients-menu')
const ingredientsHide = document.getElementById('hide-menu')
let bounding = ingredients.getBoundingClientRect();
let bottom = bounding.bottom;
window.addEventListener('scroll', (event) => {
  let scrollY = window.scrollY;
  console.log(bottom, scrollY)
  if(scrollY > bottom) {
    ingredientsMenu.classList.add('active')
    ingredients.classList.add('fixed')
  } else {
    ingredientsMenu.classList.remove('active')
    ingredients.classList.remove('fixed')
    ingredientsHide.classList.remove('active');
  }
})

ingredientsMenu.addEventListener('click', () => {
  ingredients.classList.add('active');
  ingredientsMenu.classList.remove('active');
  ingredientsHide.classList.add('active');
})


ingredientsHide.onclick = () => {
  ingredients.classList.remove('active');
  ingredientsMenu.classList.add('active');
  ingredientsHide.classList.remove('active');
}