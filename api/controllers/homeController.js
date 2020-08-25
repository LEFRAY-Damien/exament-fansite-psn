module.exports = {
    get: (req, res) => {
        console.log('get home')
        res.render('home')
    }
}