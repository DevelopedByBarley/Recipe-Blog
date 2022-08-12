const express = require('express');
const router = express.Router();
const RecipeModel = require('../database/models/recipeModel')
const CategoriesModel = require('../database/models/categoriesModel')

router.get('/', async (req, res) => {
  await new RecipeModel()
  await new CategoriesModel();
  let latestRecipes = await RecipeModel.find({}).sort({ _id: -1 }).limit(5);
  let latestCategories = await CategoriesModel.find({}).sort({ _id: -1 }).limit(5);
  let americanLatest = await RecipeModel.find({ categorie: '62f259b3849a591f6a0e1474' }).sort({ _id: -1 }).limit(5);
  let chineseLatest = await RecipeModel.find({ categorie: '62f259dddef23d8a732190e1' }).sort({ _id: -1 }).limit(5);
  let hungarianLatest = await RecipeModel.find({ categorie: '62f259a6849a591f6a0e146d' }).sort({ _id: -1 }).limit(5);
  let italianLatest = await RecipeModel.find({ categorie: '62f259f5def23d8a732190ef' }).sort({ _id: -1 }).limit(5);
  console.log(chineseLatest)

  res.render('index',
    {
      latestRecipes: latestRecipes,
      latestCategories: latestCategories,
      americanLatest: americanLatest,
      chineseLatest: chineseLatest,
      hungarianLatest: hungarianLatest,
      italianLatest: italianLatest
    }
  )
})

module.exports = router;