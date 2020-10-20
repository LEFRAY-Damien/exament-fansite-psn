// Controllers GET page freetoplay

const Article = require("../../database/models/Article"); // Model database

module.exports = {
    // Method Get
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const cardearticleftp = await Article.find({})
        // Petit log pour checker
        console.log("consol article ftp");
        console.log(cardearticleftp);
        // Et on renvoit la page article avec notre objet de tout nos article pour agrémenté la liste
        res.render('freetoplay', {
            cardearticleftp, page: "Free To Play"
        })
    }
}