const User = require('../models/User');
const Sauce = require('../models/Sauce');



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
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès!'}))
        .catch(error => res.status(400).json({ error }));
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
        .catch(error => res.status(400).json({ error }));
}

exports.likeSauce = (req, res, next) => {
    Sauce.findByIdAndUpdate({ _id: req.params.id })
        .then(sauce => {
            console.log(sauce.userId);
            const usersLiked = sauce.usersLiked;
            const usersDisliked = sauce.usersDisliked;
            let like;
            if (usersLiked.length > 0) {
                if (usersLiked.includes(sauce.userId)) {
                    like = 0;
                    sauce.likes -= 1;
                } else {
                    like = 1;
                    sauce.likes += 1;
                    usersLiked.push(sauce.userId);
                }
            }
            if (usersDisliked.length > 0) {
                if (usersDisliked.includes(sauce.userId)) {
                    like = -1;
                } else {
                    usersDisliked.push(sauce.userId);
                    sauce.dislikes += 1;
                }
            }

        })

}