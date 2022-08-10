
const express = require('express');
const router = express.Router();
const Categories = require('../database/models/categoriesModel')

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


router.get('/', async (req, res) => {
  const categories = await Categories.find({})
  res.render('categories/categories', { categories: categories });
})

router.get('/new', (req, res) => {
  res.render('categories/new')
})

router.post('/new', upload.single('cover'), async (req, res) => {
  let fileName = req.file.filename
  console.log(fileName);
  try {
    const newCategorie = await new Categories({
      title: req.body.title,
      coverImageName: fileName
    })
    newCategorie.save();

    res.redirect('/categories')

  } catch (error) {
    console.log(error);
  }

})


module.exports = router;