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
  }
})

ingredientsMenu.addEventListener('click', () => {
  ingredients.classList.add('active');
  ingredientsMenu.style.display = 'none';
  ingredientsHide.style.display = 'block';
})


ingredientsHide.onclick = () => {
  ingredients.classList.remove('active');
  ingredientsMenu.style.display = 'block';
  ingredientsHide.style.display = 'none';
}