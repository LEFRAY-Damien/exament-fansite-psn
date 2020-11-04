const Article = require("../../database/models/Article"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images
fs = require('fs')
const { link } = require("fs");

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

        console.log("article ID");
        console.log(dbArticleID);

        const LoadArticle = dbArticleID

        if (LoadArticle) {
            res.render('admin', {
                layout: 'adminLayout',
                listearticles,
                LoadArticle,
                ArticleID: dbArticleID
            })
        } else {
            res.render('admin', {
                layout: 'adminLayout',
                listearticles,
                LoadArticle,
            })
        }
    },

    majArticle: async (req, res) => {
        const articleID = await Article.findById(req.params.id) // on vien cherche l'article par son ID
        console.log("LOG article ID");
        console.log(articleID);

        const file = req.file; // cree constante file pour cree l'image

        // On cree le nom d el'image et son chemin
        const cover = {
            name: file.filename,
            originalName: file.originalname,
            //path: file.path.replace("public", "imageswebp"),
            //urlSharp: '/public/imageswebp/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
            createAt: Date.now(),
        }

        // Const cree pour faire un model de l'obj
        const details = {
            genre: req.body.genre,
            editeur: req.body.editeur,
            dateDeSortie: req.body.dateDeSortie,
            multijoueurs: req.body.multijoueurs
        }

        Article.findByIdAndUpdate({       // On cree l'article sur le model Article DB

            cover: cover,       // On enregistre le nom la provenance et la date de l'image

            details: details,  // On ce sert de la const details pour cree un model
            
            ...req.body,       // suivant le req.body

            // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
            imageCard: `/assets/imagesArticles/${req.file.filename}`,

        }, (err, post) => {

            // Et on redirige sur la page /
            res.redirect('/admin')
        })

    }
}