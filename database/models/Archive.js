
// Model de l'Archive sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose
const Schema = mongoose.Schema


// Shema enregistrer dans la base de données
const ArchiveSchema = new mongoose.Schema({

    dateArchive: String,
    title: String,
    link: String,
    title2: String,
    link2: String,
    name: String,
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