const Contact = require("../../database/models/Contact"); // Model database

module.exports = {
    get: async (req, res) => {
        const messageContact = await Contact.findOne({})

        res.render('contact',{
            page: "Contact",
            messageContact,
        })
    }
}