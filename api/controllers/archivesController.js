// Controllers GET page Archives

const Archive = require("../../database/models/Archive"); // Model database

module.exports = {
    get: async (req, res) => {

        const cardeArchive = await Archive.find({})

        console.log("1er log");
        console.log(cardeArchive);

        res.render('archives', {
            cardeArchive,
            page: 'Archive'

        })
    }
}