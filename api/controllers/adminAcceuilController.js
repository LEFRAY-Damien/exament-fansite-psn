// Controller adminAcceuil

// Import du model Article de la base de donnée
const Acceuil = require("../../database/models/Acceuil"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs')

// controllers
module.exports = {

    // Get
    getAcceuil: async (req, res) => {
        // Variable de récupération de tout les massages d'acceuil
        const messageAcceuil = await Acceuil.findOne({})

        console.log("log 1");
        console.log(messageAcceuil);

        res.render('admin', {
            layout: 'adminLayout',
            messageAcceuil
        })
    },

    // Post
    postAcceuil: (req, res) => {

        console.log("log body");
        console.log(req.body);

        Acceuil.create({
            ...req.body,

        }, (err, post) => {
            res.redirect('/admin')
        })
    }

}
