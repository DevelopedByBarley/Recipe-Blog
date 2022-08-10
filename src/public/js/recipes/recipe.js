const ingredients = document.getElementById('ingredients')
let bounding = ingredients.getBoundingClientRect();
let bottom = bounding.bottom;
window.addEventListener('scroll', (event) => {
  let scrollY = window.scrollY;
  console.log(bottom, scrollY)
  if(scrollY > bottom) {
    console.log('Hello')
  } 
})