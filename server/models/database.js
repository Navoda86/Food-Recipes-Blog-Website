
const env = require('dotenv')
env.config() 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URII, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});


require('./Ctegori');
require('./Recipes');
require('./User')