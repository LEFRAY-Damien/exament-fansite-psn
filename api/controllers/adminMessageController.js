const Message = require("../../database/models/Message"); // Model database

// Controllers
module.exports = {


    // Method Get ID Message
    loadMessage: async (req, res) => {
        // liste de tt les Message pour cree une boucle pour pouvoir charger
        const listeMessage = await Message.find({})
        // Ici query est égale à l'id envoyer via l'URL /message/:id
        const query = req.body.id // boby = formulaire

        // Ici on recherche le Message ayant comme id le query de notre URL   
        dbMessageID = await Message.findById(query)

        const LoadMessage = dbMessageID

        Message.findById(query)

        res.render('admin', {
            layout: 'adminLayout',
            listeMessage,
            LoadMessage,

        })
    },

    deleteOne: (req, res) => {
        console.log('Delete One Links');
        console.log(req.params.id)
        Message.findByIdAndDelete(req.params.id, (err) => {
            if (err) console.log(err)
            res.end()
        })
        res.redirect('/admin')

    }
}