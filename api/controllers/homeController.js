// Controllers page home, get free to play

const Acceuil = require("../../database/models/Acceuil");
const Article = require("../../database/models/Article"); // Model database
const CarouselAcceuil = require("../../database/models/CarouselAcceuil"); // Model database

module.exports = {
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const cardearticleftp = await Article.find({})
        const messageAcceuil = await Acceuil.findOne({})
        const dbCarouselAcceuil = await CarouselAcceuil.find({})

        console.log("LOG 1 ARTICLE");
        console.log(cardearticleftp);
        console.log("LOG 2 ACCEUIL CAROUSEL");
        console.log(dbCarouselAcceuil);

        res.render('home', {
            page: 'Acceuil',
            cardearticleftp,
            messageAcceuil,
            dbCarouselAcceuil
        })
    }
}
