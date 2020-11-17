// Import du model Article de la base de donnée
const Article = require("../../database/models/Article"); // Model database
fs = require('fs')
const { link } = require("fs");

module.exports = {
    // Affichage    Article ID
    getID: async (req, res) => {

        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.params.id // boby = formulaire

        console.log('LOG');
        console.log(query);
        // Ici on recherche l'article ayant comme id le query de notre URL   
        dbArticleID = await Article.findById(query)

        // Ici nous resortons notre constructeur
        Article
            // Nous recherchons une article ayant le meme ID que notre req.params.id
            .findById(query)
            // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .populate('carouselArticle')

            // Nous executons nous recherche
            .exec((err, result) => {
                // Si il y une erreur on la log grace à handleError
                if (err) return handleError(err);

                // Et on renvoie notre page avec les data
                res.render('article_id', {
                    page: "Article",
                    ArticleID: dbArticleID,
                    carouselArticle: result.carouselArticle
                })
            })
    }
}