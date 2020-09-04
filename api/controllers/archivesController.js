module.exports = {
    get: (req, res) => {
        console.log('get archive')
        res.render('archives', {
            page: 'Archive'

        })
    }
}