// Import du model Article de la base de donnée
const Article = require("../../database/models/Article"); // Model database
fs = require('fs')
const { link } = require("fs");

module.exports = {
    getID: async (req, res) => {

        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.params.id // boby = formulaire
        // Ici on recherche l'article ayant comme id le query de notre URL   
        dbArticleID = await Article.findById(query)

        console.log("article ID");
        console.log(dbArticleID);

        const LoadArticle = dbArticleID

        // console.log('get article_id')
        res.render('article_id', {
            page: "Article",
            LoadArticle,
            ArticleID: dbArticleID
        })
    }
}