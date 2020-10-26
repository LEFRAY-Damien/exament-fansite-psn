// Controller adminContact

// Import du model Contact de la base de donnée
const Contact = require("../../database/models/Contact"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs') // fs require effacer un fichier

// controllers
module.exports = {

    // Post
    postContact: (req, res) => {

        Contact.create({
            ...req.body,

        }, (err, post) => {
            res.redirect('/admin')
        })
    },

    // Put
    putContact: async (req, res) => {

        const messageContact = await Contact.findOne({ _id: req.params.id })

        if (req.params.id) {
            Contact.findByIdAndUpdate(
                { _id: req.params.id },

                { ...req.body },

                (err) => {
                    // Si nous avons pas d'erreur alors on redirige
                    if (!err) return res.redirect('/admin')
                    // Sinon on renvoit l'err
                    else res.send(err)
                })
        } else {
            Contact.create( { ...req.body } ,
                (err, post) => {
                    res.redirect('/admin')
                })
        }
    }
}
