// Model de l'article sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise ic

// Shema enregistrer dans la base de données
const ArticleSchema = new mongoose.Schema({

    title: String,  // Titre : chaine de caractere
    descriptionGen: String, // Description general de l'article
    descriptionSimple: String, // Description simplifié
    imageCard: String, // Image principal
   // imagesCarouselId: String, // Images du carousel
    pegi: String, // Pegi de l'article
    note: String, // Note en etoiles de l'article 
    details: {      // Details est un OBJ
        type: Object
    },
    cover: {
        name: String,
        originalName: String,
        // path: String,
        // urlSharp: String,
        createAt: Date
    }

})

// Cree une constante article selon le shema ci dessus
const Article = mongoose.model('Article', ArticleSchema)
   
// Exporte le contenue d'un article sur d'autre page sous le nom Article
module.exports = Article
    
