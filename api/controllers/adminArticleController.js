const Article = require("../../database/models/Article"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images
fs = require('fs')
const { link } = require("fs");
const CarouselArticle = require("../../database/models/CarouselArticle");

// Controllers
module.exports = {

    // Method Get ID Article
    loadArticle: async (req, res) => {
        // liste de tt les article pour cree une boucle pour pouvoir charger
        const listearticles = await Article.find({})
        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.body.id // boby = formulaire

        // Ici on recherche l'article ayant comme id le query de notre URL   
        dbArticleID = await Article.findById(query)

        console.log('LOG');
        console.log(query);

        const LoadArticle = dbArticleID

        Article.findById(query).populate('carouselArticle').exec((err, result) => {

            if (LoadArticle) {
                res.render('admin', {
                    layout: 'adminLayout',
                    listearticles,
                    LoadArticle,
                    ArticleID: dbArticleID,
                    carouselArticle: result.carouselArticle

                })
            } else {
                res.render('admin', {
                    layout: 'adminLayout',
                    listearticles,
                    LoadArticle
                })
            }
        })
    },

    // Methode PUT
    majArticle: async (req, res) => {

        const articleID = await Article.findById(req.params.id) // on vien cherche l'article par son ID
        query = { _id: req.params.id };

        console.log('LOG IMG');
        console.log(articleID);

        // pathImg sera le chemin de notre fichier à supprimer
        pathImg = path.resolve("public/imagesArticles/" + articleID.cover.name)

        // Const cree pour faire un model de l'obj
        const details = {
            genre: req.body.genre,
            editeur: req.body.editeur,
            dateDeSortie: req.body.dateDeSortie,
            multijoueurs: req.body.multijoueurs
        }

        // condition si il n'y a pas d'image dans le formulaire alors tu update sans image
        if (!req.file) {

            Article.updateOne(query, {

                details: details,  // On ce sert de la const details pour cree un model

                ...req.body,

            }, (err) => {
                res.redirect('/admin')
            })
        } else {

            const file = req.file; // cree constante file pour cree l'image

            // On cree le nom de l'image et son chemin
            const cover = {
                name: file.filename,
                originalName: file.originalname,
                //path: file.path.replace("public", "imageswebp"),
                //urlSharp: '/public/imageswebp/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
                createAt: Date.now(),
            }

            Article.updateOne(query, {       // On cree l'article sur le model Article DB

                cover: cover,       // On enregistre le nom la provenance et la date de l'image

                details: details,  // On ce sert de la const details pour cree un model

                ...req.body,       // suivant le req.body

                // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
                imageCard: `/assets/imagesArticles/${req.file.filename}`,

            }, (err) => {

                if (err) console.log(err)

                // Si notre callback nous donne pas d'erreur alors note fonction de suppression de l'image de lance avec un callback d'err
                fs.unlink(pathImg, (err) => {
                    if (err) console.log(err)
                    //  Ici notre ancienne image viens d'etre supprimer
                    else res.redirect('/admin')

                })

            })
        }
    },

    // Method Delete One
    deleteOne: async (req, res) => {

        // Ici une constante pour récupéré le CarouselArticle lié a notre Article
        const refCarouselArticle = await CarouselArticle.find({
            articleID: req.params.id
        })

         // Log pour checker
         console.log("CAROUSEL ARTICLE");
        console.log(refCarouselArticle)

        // Fonction de suppression de un Articles rechercher par son _id
        Article.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on Continu
            if (!err) {
                // Ici on check si un carousel est lié à notre Article
                if (refCarouselArticle) {
                    // Ici le carousel lié à notre ID de notre Article est supprimer
                    CarouselArticle.deleteOne({
                        // On demande à récupéré tout nos carousel ayant comme articleID req.params.id (l'ID de l'article référant)
                        articleID: req.params.id
                        // Petit Callback en cas d'err
                    }, (err) => {
                        // Petit log de check
                        console.log('Le carousel a été supprimer');
                        // Si il n'y a pas d'err alors on redirige sur la page article
                        if (!err) return res.redirect('/admin')
                        // Sinon on renvoie l'err
                        else res.send(err)
                    })
                    // Si (sinon) notre article ne contient pas de commentaire alors
                } else return res.redirect('/admin')
            }
            // Sinon on renvoit l'err
            else res.send(err)
        })
    }
}