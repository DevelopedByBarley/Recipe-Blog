let deleteRecipeBtn = document.querySelectorAll('.deleteRecipeBtn');
let confirm = document.getElementById('confirm');
let accept = document.getElementById('accept');
let reject = document.getElementById('reject')


for (let deleteBtn of deleteRecipeBtn) {
  deleteBtn.addEventListener('click', async (event) => {
    let id = event.currentTarget.dataset.id;

    confirm.classList.add('active')

    accept.onclick = async () => {
      try {

        await fetch(`/recipes/recipe/${id}`, {
          method: 'DELETE',
        })
        window.location.assign('/recipes')


      } catch (error) {
        window.location.assign('/')
        console.log(error)
      }
    }

    reject.onclick = () => {
      confirm.classList.remove('active')
    }




  })

}

