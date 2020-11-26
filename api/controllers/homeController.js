// Controllers page home, get free to play

const Acceuil = require("../../database/models/Acceuil");
const Article = require("../../database/models/Article"); // Model database
const CarouselAcceuil = require("../../database/models/CarouselAcceuil"); // Model database
const Archive = require("../../database/models/Archive"); // Model database


module.exports = {
    get: async (req, res) => {
        // Variable de récupération de tout les Articles
        const cardearticleftp = await Article.find({})
        const messageAcceuil = await Acceuil.findOne({})
        const dbCarouselAcceuil = await CarouselAcceuil.find({})
        const cardeArchive = await Archive.find({})

        res.render('home', {
            page: 'Accueil',
            cardearticleftp,
            messageAcceuil,
            dbCarouselAcceuil,
            cardeArchive
        })
    }
}
