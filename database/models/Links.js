// Model de l'article sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise ic
const Archive = require("./Archive"); // Model database
const Schema = mongoose.Schema

// Shema enregistrer dans la base de données
const LinksSchema = new mongoose.Schema({

    title: String,
    link: String,

        // Ici nous creeons une relation avec le model Archive
    // C'est un objet qui acceuillera les id des ArchiveParent (String)
    articleID: {
        type: Schema.Types.ObjectId,
        ref: 'Archive'
    }

})

// Cree une constante article selon le shema ci dessus
const Links = mongoose.model('Links', LinksSchema)
   
// Exporte le contenue d'un article sur d'autre page sous le nom Article
module.exports = Links
    
