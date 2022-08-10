const express = require('express');
const router = express.Router();
const RecipeModel = require('../database/models/recipeModel')
const CategoriesModel = require('../database/models/categoriesModel')

router.get('/', async (req, res) => {
  await new RecipeModel()
  await new CategoriesModel();
  let latestRecipes = await RecipeModel.find({}).sort({ _id: -1 }).limit(5);
  let latestCategories = await CategoriesModel.find({}).sort({_id : -1}).limit(5);

  res.render('index', { latestRecipes: latestRecipes, latestCategories: latestCategories })
})

module.exports = router;