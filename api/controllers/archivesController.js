// Controllers GET page Archives

const Archive = require("../../database/models/Archive"); // Model database

module.exports = {
    get: async (req, res) => {

        const cardeArchive = await Archive.find({}).populate('links').exec()
        // const troisiemeCardeArchive = await Archive.findOne({})

        // const title3 = (troisiemeCardeArchive.nomTroisiemeLien < 1)

        console.log("log trois");
        // console.log(title3);
        console.log(cardeArchive);

        console.log("troisiemeLien");
        // console.log(troisiemeCardeArchive.nomTroisiemeLien);

        // if (title3) {

            res.render('archives', {
                cardeArchive,
                // title3,
                page: 'Archive'

            })

        // } else {

        //     res.render('archives', {
        //         cardeArchive,
        //         page: 'Archive'

        //     })
        // }
    }
}