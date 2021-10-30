const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Création de l'application express
const app = express();


// import sauceRoutes from './routes/sauce.js';
const userRoutes = require('./routes/user');

//Connection à la base de donnée MongoDb
mongoose.connect('mongodb+srv://userP6:owPKVQSH9LT9YkgH@apiavisgastro.nesyz.mongodb.net/ApiAvisGastro?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);

module.exports = app;
