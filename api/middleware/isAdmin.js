// Middleware Admin

module.exports = (req, res, next) => {
    //si on est dans une session user active on redirige vers la page /article/add
    if (req.session.isAdmin) {
        next()
    } else {
        return res.redirect('/')
    }
}