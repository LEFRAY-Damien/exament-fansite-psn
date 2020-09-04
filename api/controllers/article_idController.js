module.exports = {
    get: async (req, res) => {
        console.log('get article_id')
        res.render('article_id',{
            page: "Article"
        })
    }
}