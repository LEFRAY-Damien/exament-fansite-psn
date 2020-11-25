// Model de l'Acceuil sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose

// Shema enregistrer dans la base de données
const AcceuilSchema = new mongoose.Schema({

    mesAcceuil: String // Message de la page home

})

// Cree une constante Acceuil selon le shema ci dessus
const Acceuil = mongoose.model('Acceuil', AcceuilSchema)

// Exporte le contenue d'un Acceuil sur d'autre page sous le nom Acceuil
module.exports = Acceuil