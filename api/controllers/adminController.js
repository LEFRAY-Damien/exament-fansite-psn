module.exports = {
    get: (req, res) => {
        console.log('get admin')
        res.render('admin')
    }
}