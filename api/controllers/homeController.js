// Controllers page home, get free to play

const Acceuil = require("../../database/models/Acceuil");
const Article = require("../../database/models/Article"); // Model database

module.exports = {
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const cardearticleftp = await Article.find({})
        const messageAcceuil = await Acceuil.findOne({})

        console.log("log 1");
        console.log(messageAcceuil);

        res.render('home', {
            page: 'Acceuil',
            cardearticleftp,
            messageAcceuil
        })
    }
}
