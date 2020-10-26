// Model de Contact sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise ic
const Schema = mongoose.Schema

// Shema enregistrer dans la base de données
const ContactSchema = new mongoose.Schema({

    apropos: String,
    inputtwitter: String,
    inputfacebook: String,
    inputGithub: String

})

// Cree une constante article selon le shema ci dessus
const Contact = mongoose.model('Contact', ContactSchema)
   
// Exporte le contenue d'un article sur d'autre page sous le nom Article
module.exports = Contact
    
