// Controller adminAcceuil

// Import du model Acceuil de la base de donnée
const Acceuil = require("../../database/models/Acceuil"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs') // fs require effacer un fichier

// controllers
module.exports = {

    // Post
    postAcceuil: (req, res) => {

        Acceuil.create({
            ...req.body,

        }, (err, post) => {
            res.redirect('/admin')
        })
    },

    // Put
    putAcceuil: async (req, res) => {

        const messageAcceuil = await Acceuil.findOne({ _id: req.params.id })

        if (req.params.id) {
            Acceuil.findByIdAndUpdate(
                { _id: req.params.id },

                { ...req.body },

                (err) => {
                    // Si nous avons pas d'erreur alors on redirige
                    if (!err) return res.redirect('/admin')
                    // Sinon on renvoit l'err
                    else res.send(err)
                })
        } else {
            Acceuil.create( { ...req.body } ,
                (err, post) => {
                    res.redirect('/admin')
                })
        }
    }
}
