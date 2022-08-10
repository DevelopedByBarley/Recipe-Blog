require('dotenv').config()
let port = process.env.PORT

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const connectToDatabase = require('./database/connect/connect')

const indexRouter = require('./routes/index')
const recipeRouter = require('./routes/recipes');
const categoriesRouter = require('./routes/categories')



app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.set('layout', __dirname + '/views/layouts/layout')

app.use(express.static(__dirname + '/public'))
app.use(expressLayouts)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter)
app.use('/recipes', recipeRouter)
app.use('/categories', categoriesRouter);


connectToDatabase();


app.listen(port, () => { console.log(`App is listening on ${port}`)})