/* Mes fonctions utiles pour l'application */
/**
 * Permet de vérifier que l'userId est présent dans le tableau usersLiked
 * @param {*} userId 
 * @param {*} usersLiked 
 * @returns {Boolean} 
 */
exports.isInLiked = (userId, usersLiked) => {
    return usersLiked.includes(userId);
};

exports.isInDisliked = (userId, usersDisliked) => {
    return usersDisliked.includes(userId);
};

exports.mySwitch = () => {
    switch (like) {
        case 1:
            console.log('cas 1');
            // Ajout de userId dans le tableau usersLiked
            usersLiked = sauce.usersLiked.push(userId);
            // Incrémentation du nombre de likes 
            likes = sauce.likes++;
            break;
        case 0:
            console.log('cas 0');
            // Vérifie que l'id de l'utilisateur est dans le tableau des likes
            if (isInLiked(userId, sauce.usersLiked)) {
                sauce.usersLiked.forEach((index, id) => {
                    if (userId == id) {
                        usersLiked = sauce.usersLiked.splice(index, 1);
                        likes = sauce.likes--;
                    }
                });
            };
            // Vérifie que l'id de l'utilisateur est dans le tableau des dislikes
            if (isInDisLiked(userId, sauce.usersDisLiked)) {
                sauce.usersDisliked.forEach((index, id) => {
                    if (userId == id) {
                        usersDisLiked = sauce.usersDisliked.splice(index, 1);
                        dislikes = sauce.dislikes--;
                    }
                });
            };
            break;
        case -1:
            console.log('cas -1');
            usersDisLiked = sauce.usersDisliked.push(userId);
            dislikes = sauce.dislikes++;
            break;
    };
}