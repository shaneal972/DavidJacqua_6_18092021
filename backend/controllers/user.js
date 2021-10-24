import User from '../models/users';


exports.createUser = (req, res, next) => {
    delete req.body._id;

    const user = new User({
        ...req.body
    });

    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => res.status(400).json({ error }))
    
}

