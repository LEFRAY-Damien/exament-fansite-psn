const Month = require('../../database/models/Month')

module.exports = {
    getMonth: (req, res) => {
        Month.find({})
            .populate('game')
            .exec((err, data) => {
                if (err) console.log(err)
                console.log('Get Month')
                console.log(data)
                // res.render('month', {
                //     page: "Jeux du mois",
                //     month: data
                // })
                res.json(data)
            })
    },
    getMonthID: (req, res) => {
        Month.findById(req.params.id)
             .populate('game')
             .exec((err, data) => {
                if (err) console.log(err)
                console.log('Get Month ID')
                console.log(data)
                res.render('monthID', {
                    page: "Jeux du mois",
                    month: data
                })
            })
    },
    createMonth: async (req, res) => {
        const dbMonth = await Month.find({})

        Month.create({...req.body}, (err) => {
            if(err) console.log(err)
            // res.render('month', {
            //     month: dbMonth
            // })
            res.json(dbMonth)
        })
    }
}