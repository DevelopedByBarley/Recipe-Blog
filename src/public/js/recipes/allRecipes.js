let deleteRecipeBtn = document.querySelectorAll('.deleteRecipeBtn');

for (let deleteBtn of deleteRecipeBtn) {
  deleteBtn.addEventListener('click', async (event) => {
    let id = event.currentTarget.dataset.id;
    console.log(id);
    try {

      await fetch(`/recipes/recipe/${id}`, {
        method: 'DELETE',
      })
      window.location.assign('/recipes')


    } catch (error) {
      window.location.assign('/')
      console.log(error)
    }
  })
}
