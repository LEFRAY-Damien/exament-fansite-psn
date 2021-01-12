module.exports = {
    newCookie: async (req, res, next) => {
        console.log('test nouveau cookie')
        // Ici on créé un cookie: Cookie avec c'est parametre
        res.cookie('Cookie', {
          domain: '.coucou',
          path: req.url,
          secure: true,
          resave: false
        })
        // res.render('home', {
        //   newCookie: 'Un nouveau cookie "Cookie" vous à été assigné',
        //   CCookie: 'cookie "cookie"'
        // })
        // Notre redirection
        res.redirect('/')
      }
}