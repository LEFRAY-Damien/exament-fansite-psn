const Message = require("../../database/models/Message"); // Model database
const Contact = require("../../database/models/Contact"); // Model database
const format = require('date-format')
module.exports = {
    get: async (req, res) => {
        const messageContact = await Contact.findOne({})

        res.render('contact', {
            page: "Contact",
            messageContact,
        })
    },

    // Post Message Page Contact
    postMessage: (req, res) => {
        Message.create({
            ...req.body,

            // Ici on travail une date qui ce retrouve au format 'String'
            created: format.asString('dd/MM/yyyy', new Date()),

            // Ici on travail une date qui ce retrouve au format 'String'
            // created: format.asString('le dd/MM/yyyy à hh:mm:ss', new Date()),

            // Ici on travail une date qui ce retrouve au format 'Date'
            dateISO: format(),

            // Ici on viens inscrire la date au moment T
            // date: Date.now()
        }, (err, post) => {
            res.redirect('/contact')
        })
    }
}