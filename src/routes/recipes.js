const express = require('express');
const router = express.Router();
const fs = require('fs');

const RecipeModel = require('../database/models/recipeModel');
const CategoriesModel = require('../database/models/categoriesModel');

const recipeModel = require('../database/models/recipeModel');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })





router.get('/admin', (req, res) => {
  res.render('error/oops', { errorMessage: "Sajnos a bejelentkezés még nem elérhető!" });
})


//RECIPES REQUESTS

router.get('/', async (req, res) => {
  try {
    let recipes = await RecipeModel.find({});
    res.render('recipes/allRecipes', { recipes: recipes })
  } catch (error) {
    console.log(error)
    res.render('error/oops', { errorMessage: "Sajnos a receptgyüjtemény még nem elérhető!" })
  }
})

router.get('/new', async (req, res) => {
  const categories = await CategoriesModel.find({});
  const recipes = await recipeModel.find({}) 
  res.render('recipes/new', { categories: categories })
})

router.get('/recipe/:id', async (req, res) => {
  let id = req.params.id;
  let recipe = await RecipeModel.findById(id).populate('categorie').exec()

  res.render('recipes/recipe', { recipe: recipe })
})

router.get('/recipe/update/:id', async (req, res) => {
  let id = req.params.id;
  const categories = await CategoriesModel.find({});
  let recipe = await RecipeModel.findOne({
    _id: id
  });

  res.render('recipes/update', { recipe: recipe, categories: categories })
})

router.post('/new', upload.single('cover'), async (req, res) => {
  let fileName = req.file.filename;

  try {
    const newRecipe = await new RecipeModel({
      title: req.body.title,
      portion: req.body.portion,
      cost: req.body.cost,
      difficult: req.body.difficult,
      preparationTime: req.body.preparationTime,
      cookDuration: req.body.cookDuration,
      fullTime: Number(req.body.preparationTime) + Number(req.body.cookDuration),
      ingredients: req.body.ingredients,
      comment: req.body.comment,
      steps: req.body.steps,
      coverImageName: fileName,
      categorie: req.body.categorie
    })

    await newRecipe.save();
    res.redirect('/recipes')
  } catch (error) {
    console.error(error);
    res.render('error/oops', { errorMessage: "Valami lemaradt! Tölts ki minden mezőt!" });
  }
})



router.delete('/recipe/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let findRecipe = await RecipeModel.findOne({
      _id: id
    })
    let coverImageName = findRecipe.coverImageName;
    
    await RecipeModel.deleteOne({
      _id: id
    })
  
    fs.unlink(`./src/public/images/${coverImageName}`, (err) => {
      if(err) console.log(err);
      else console.log(`${coverImageName} deleted!`)
    })
  
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
})

router.put('/recipe/update/:id', async (req, res) => {
  let id = req.params.id;

  const newRecipe = {
    title: req.body.title,
    portion: req.body.portion,
    cost: req.body.cost,
    difficult: req.body.difficult,
    preparationTime: req.body.preparationTime,
    cookDuration: req.body.cookDuration,
    fullTime: req.body.preparationTime + req.body.cookDuration,
    ingredients: req.body.ingredients,
    comment: req.body.comment,
    steps: req.body.steps,
    categorie: req.body.categorie
  }

  try {
    let updatedRecipe = await RecipeModel.findByIdAndUpdate({ _id: id }, newRecipe)
    console.log(updatedRecipe)
    res.redirect('/recipes')
  } catch (error) {
    console.log(error)
    res.render('error/oops', { errorMessage: "Valami lemaradt! Tölts ki minden mezőt!" });
  }


})


module.exports = router;