/*
 *
 * Model de 'Month'
 ******************************/

// Import de Mongoose
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

// Import model
const Game = require('./Game')

// Création de notre Shéma (Article)
const MonthSchema = new mongoose.Schema({
    name: {
        type: String
    },
    content: {
        type: String
    },
    game: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }]
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model('Month', MonthSchema)