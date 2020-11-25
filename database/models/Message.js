
// Model de Message sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose 
const Schema = mongoose.Schema

// Shema enregistrer dans la base de données
const MessageSchema = new mongoose.Schema({

    nom: String,
    mail: String,
    objet: String,
    message: String,
    created: {
        type: String
    },
    dateISO: {
        type: Date
    },

})

// Cree une constante article selon le shema ci dessus
const Message = mongoose.model('Message', MessageSchema)
   
// Exporte le contenue d'un article sur d'autre page sous le nom Article
module.exports = Message
    