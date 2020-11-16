// Model de l'article sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise ic

// Shema enregistrer dans la base de données
const ArticleSchema = new mongoose.Schema({

    title: String,  // Titre : chaine de caractere
    descriptionGen: String, // Description general de l'article
    descriptionSimple: String, // Description simplifié
    imageCard: String, // Chemin de l image principal
    pegi: String, // Pegi de l'article
    langue: String, // Langue de l'article
    voix: String, // voix de l'article 
    note: String, // note de l'article
    details: {      // Details est un OBJ
        type: Object
    },
    cover: {
        name: String,
        originalName: String,
        // path: String,
        // urlSharp: String,
        createAt: Date
    },
    // Ici nous creeons une relation avec le model carouselArticle
    // C'est un tableau qui acceuillera les id des images carousel
    // carouselArticle: {
    //     type: Schema.Types.carouselArticle,
    //     ref: 'carouselArticle'
    // }
})

// Cree une constante article selon le shema ci dessus
const Article = mongoose.model('Article', ArticleSchema)
   
// Exporte le contenue d'un article sur d'autre page sous le nom Article
module.exports = Article
    
