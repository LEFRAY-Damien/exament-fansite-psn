const Game = require('../../database/models/Game')

module.exports = {
    getGame: async (req, res) => {
        const dbGame = await Game.find({})
        res.json(dbGame)
    },
    createGame: async (req, res) => {
        const dbGame = await Game.find({})

        Game.create({...req.body}, (err) => {
            if(err) console.log(err)
            // res.render('month', {
            //     month: dbGame
            // })
            res.json(dbGame)
        })
    }
}