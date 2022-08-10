const loader = document.getElementById('loader');
const container = document.getElementById('index-container')

window.addEventListener('load', () => {
  loader.classList.add('deactive');
  container.classList.add('active');
})