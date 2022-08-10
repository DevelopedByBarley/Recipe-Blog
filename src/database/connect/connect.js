const mongoose = require('mongoose');

function connectToDatabase() {
  mongoose.connect(`mongodb+srv://Barley:${process.env.DATABASE_PW}@cluster0.qtfsg.mongodb.net/kinga-recipe-blog`)
  mongoose.connection
    .on('error', error => console.log(error))
    .once('open', () => console.log(`Database is connected!`))
}

module.exports = connectToDatabase;

