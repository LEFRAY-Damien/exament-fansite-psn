// /*
//  * Model de 'CarouselArticle'
//  ******************************/

// // Import de Mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// // Import model
const Article = require('./Article')

// // Création de notre Schéma (CarouselArticle)
const CarouselArticleSchema = new mongoose.Schema({

    galleryImg: [], // tableau

    // Ici nous creeons une relation avec le model Article
    // C'est un objet qui acceuillera les id des ArticleParent (String)
    articleID: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    created: {
        type: Date,
        default: Date.now()
    }

})

// // Et l'on export notre model grace à la passerelle Mongoose
// // Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('CarouselArticle', CarouselArticleSchema )