// Controllers GET page Archives

const Archive = require("../../database/models/Archive"); // Model database

module.exports = {
    get: async (req, res) => {
        const cardeArchive = await Archive.find({})

            res.render('archives', {
                page: 'Archive',
                cardeArchive
            })
    }
}