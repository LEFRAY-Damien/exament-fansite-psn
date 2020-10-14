module.exports = {
    get: (req, res) => {
       // console.log('Get article')
        res.render('article',{
            page: "Jeux du mois"
        })
    }
}