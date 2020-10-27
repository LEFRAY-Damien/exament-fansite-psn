const Article = require("../../database/models/Article"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images
fs = require('fs')
const { link } = require("fs");

// Controllers
module.exports = {

    // Method Get ID
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

        if (LoadArchive) {
            res.render('admin', {
                layout: 'adminLayout',
                listearticles,
                LoadArticle,
                ArticleID: dbArticleID
            })
        } else {
            res.render('admin', {
                layout: 'adminLayout',
            })
        }
    }
}