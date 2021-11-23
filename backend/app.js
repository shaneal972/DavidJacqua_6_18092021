const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Création de l'application express
const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Chaque adresse IP est limitée à 100 requêtes par fenêtre.
});

// Sécurisation de quelques failles de sécurité
app.use(helmet());

// Sécurisation de l'attaque brute-force
app.use(limiter);

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Connection à la base de donnée MongoDb
mongoose.connect(process.env.DATABASE_URL,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api', sauceRoutes);

module.exports = app;
