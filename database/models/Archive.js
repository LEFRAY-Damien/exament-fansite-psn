// Model de l'Archive sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise

// Shema enregistrer dans la base de données
const ArchiveSchema = new mongoose.Schema({

    dateArchive: String, 
     
    nomPremierLien: String,
    lienPremierLien: String,
    
    nomDeuxiemeLien: String,
    lienDeuxiemeLien: String,

    nomTroisiemeLien: String,
    lienTroisiemeLien: String,

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