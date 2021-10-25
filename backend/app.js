import express from 'express';
import mongoose from 'mongoose';

// Création de l'application express
const app = express();

// import sauceRoutes from './routes/sauce.js';
import userRoutes from './routes/user';

//Connection à la base de donnée MongoDb
<<<<<<< HEAD
mongoose.connect('mongodb+srv://userP6:owPKVQSH9LT9YkgH@apiavisgastro.nesyz.mongodb.net/ApiAvisGastro?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
=======
mongoose.connect('mongodb+srv://USERNAME6:<PASSWORD>@apiavisgastro.nesyz.mongodb.net/YourDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
>>>>>>> 667def77163fe21b71621b1b13dced9c7bcf5afa
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  


app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

<<<<<<< HEAD
app.use('api/user', userRoutes);

export default app;
=======
export default app;
>>>>>>> 667def77163fe21b71621b1b13dced9c7bcf5afa
