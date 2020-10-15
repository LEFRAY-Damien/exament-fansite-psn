// Model de l'Game sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose vue qu'elle seras utilise ic
const Schema = mongoose.Schema

const Month = require('./Month')

// Shema enregistrer dans la base de données
const GameSchema = new mongoose.Schema({

    title: String,  // Titre : chaine de caractere
    descriptionGen: String, // Description general de l'Game
    descriptionSimple: String, // Description simplifié
    imageCard: String, // Image principal
   // imagecarousel: String, // Images du carousel
   // pegi: String, // Pegi de l'Game
   // note: String, // Note en etoiles de l'Game 
    details: {      // Details est un OBJ
        type: Object
    },
    cover: {
        name: String,
        originalName: String,
        path: String,
        urlSharp: String,
        createAt: Date
    },
    month: {
        type: Schema.Types.ObjectId,
        ref: 'Month'
    }

})

// Cree une constante Game selon le shema ci dessus
const Game = mongoose.model('Game', GameSchema)
   
// Exporte le contenue d'un Game sur d'autre page sous le nom Game
module.exports = Game
    
