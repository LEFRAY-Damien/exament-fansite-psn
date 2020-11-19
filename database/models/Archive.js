// Model de l'Archive sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise
const Schema = mongoose.Schema
const Links = require('./Links')


// Shema enregistrer dans la base de données
const ArchiveSchema = new mongoose.Schema({

    dateArchive: String,
    
     // Ici nous creeons une relation avec le model Links
    // C'est un tableau qui acceuillera les id des Links (String)
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Links'
    }],
    imageArchive: String,
    cover: {
        name: String,
        originalName: String,
        // path: String,
        // urlSharp: String,
        createAt: Date
    }
})

// Cree une constante Archive selon le shema ci dessus
const Archive = mongoose.model('Archive', ArchiveSchema)
   
// Exporte le contenue de Archive sur d'autre page sous le nom Archive
module.exports = Archive