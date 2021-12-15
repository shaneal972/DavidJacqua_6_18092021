const Sauce = require('../models/Sauce');
const fs = require('fs');
const path = require('path');

/**
 * Permet de récupérer toutes les sauces de la bdd
 * @param req
 * @param res
 * @param next
 */
exports.getSauces = (req, res, next) => {
    Sauce.find().then(sauce => {
        res.status(200).json(sauce);
    }).catch((error) => {
        res.status(400).json(
            {error: error}
        );
    })
};


/**
 * Permet de créer une sauce
 * @param req
 * @param res
 * @param next
 */
exports.createSauce = (req, res, next) => {
    const sauceObj = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObj,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(
            () => {
                res.status(201).json({
                    message: 'Sauce crée avec succès !' });
        }).catch(
            (error) => {
                res.status(400).json({
                    error : error
                });
        }
    );
};

/**
 * Permet de récupérer une sauce selon son id
 * @param req
 * @param res
 * @param next
 */
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

/**
 * Permet de modifier une sauce selon son id
 * @param req
 * @param res
 * @param next
 */
exports.updateSauce = (req, res, next) => {
    if (req.file) {
        Sauce.findOne({ id: req.params.id })
            .then((data) => {
                //Récupération du filename de la photo à supprimer dans la bdd
                const filename = data.imageUrl.split("/images")[1];
                //Suppression de l'image dans le dossier du serveur
                // fs.unlink(`/images/${filename}`, (err) => {
                //     if (err) throw err;
                // });

            })
        .catch((error) => res.status(404).json({error}))
    }

    //Mettre à jour la sauce dans la bdd
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
        };
    
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès!'}))
        .catch(error => res.status(404).json({ error }));
};

/**
 * Permet de supprimer une sauce selon son id
 * @param req
 * @param res
 * @param next
 */
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée avec succès !'}))
        .catch(error => res.status(400).json({ error: error.message }));
}

/**
 * Permet de liker ou disliker une sauce
 * @param {Request} req 
 * @param {Response} res 
 * @param next 
 */
exports.likeSauce = (req, res, next) => {
    let usersLiked = [];
    let usersDisLiked = [];
    // Récupération de la sauce
    Sauce.findOne({ _id: req.params.id }, {}, (err, docs) => {
        usersLiked = docs.usersLiked;
        usersDisLiked = docs.usersDisLiked;

        switch (req.body.like) {
            case 1:
                Sauce.updateOne({ _id: req.params.id }, {
                    $inc: { likes: 1 }, // Incrémentation du nombres de likes
                    $push: { usersLiked: req.body.userId } // Ajout de l'userId dans le tableau de likes
                })
                    .then(() => res.status(201).json({ message: "Vous aimez cette sauce" }))
                    .catch((error) => res.status(400).json({ message: "Erreur mongoose", error: error.message }))
                break;
            case 0:
                if (usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, {
                        $inc: { likes: -1 }, // Décrémentation du nombres de likes
                        $pull: { usersLiked: req.body.userId } // Suppression de l'userId dans le tableau de likes
                    })
                        .then(() => res.status(201).json({ message: "Vous n'aimez plus cette sauce" }))
                        .catch((error) => res.status(400).json({ message: "Erreur mongoose", error: error.message }))
                } else {
                    Sauce.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: -1 }, // Décrémentation du nombres de likes
                        $pull: { usersDisLiked: req.body.userId } // Suppression de l'userId dans le tableau de likes
                    })
                        .then(() => res.status(201).json({ message: "Vous ne détestez plus cette sauce" }))
                        .catch((error) => res.status(400).json({ message: "Erreur mongoose", error: error.message }))
                  
                };
                break;
            case -1:
                Sauce.updateOne({ _id: req.params.id }, {
                    $inc: { dislikes: 1 }, // Incrémentation du nombres de dislikes
                    $push: { usersDisLiked: req.body.userId } // Ajout de l'userId dans le tableau de likes
                })
                    .then(() => res.status(201).json({ message: "Vous détestez cette sauce" }))
                    .catch((error) => res.status(400).json({ message: "Erreur mongoose", error: error.message }))
                break;
        };

        if (err) {
            console.log(err.message);
        };
    });    
};