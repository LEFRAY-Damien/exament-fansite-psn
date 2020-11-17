// Controller adminArticleCarousel

// Import du model Article de la base de donnée
const CarouselArticle = require("../../database/models/CarouselArticle"); // Model database
const Article = require("../../database/models/Article"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs') // fs require effacer un fichier


module.exports = {
    // Method Post (nous créons un article avec ses image)
    postArrayArticle: async (req, res, next) => {

        // On définit query comme un objet acceuillant notre req.params.id
        const query = {
            _id: req.params.id
        }

        // On définit nos Objet en relation avec notre carousel
        // Attention a bien utilisé un nom d'autheur définit dans la db pendant la creation des articles
        const article = await Article.findById(query)

        // tableau du req.files
        const files = req.files,
            // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
            arrayFiles = []

        // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
        // nos objets dans le tableaux
        for (let i = 0; i < files.length; i++) {
            const dbFilename = files[i].filename
            if (files) {
                console.log(files[i].filename)
                // C'est grace à la method push que nous inscrivont nos data dans nos Objets
                // Et nos objets dans le tableau
                arrayFiles.push({
                    name: files[i].filename,
                    filename: `/assets/imagesCarouselID/${files[i].filename}`,
                    orifginalname: files[i].originalname
                })
            }
        }

        const carouselArticle = new CarouselArticle({

            galleryImg: arrayFiles,
            articleID: article._id

        })

        // Ici on incrémente notre carousel dans nos model en relation
        article.carouselArticle.push(carouselArticle._id)

        // On sauvegarde nous modification
        carouselArticle.save((err) => {
            if (err) return handleError(err)
        })
        article.save((err) => {
            if (err) return handleError(err)
        })

        res.redirect('/admin')
    },

    // Method Delete One
    deleteOne: async (req, res) => {
        // Ici on vient récupéré l'article parent de notre commentaire pour la redirection
        const articleParentCarousel = await CarouselArticle.findById(req.params.id)
        // Fonction de suppression d un Carousel rechercher par son _id
        CarouselArticle.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on redirige sur l'article parent
            if (!err) return res.redirect(`/admin`)
            // Sinon on renvoit l'err
            else res.send(err)
        })
    }


}