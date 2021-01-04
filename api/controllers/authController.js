/*
 * Controller Auth
 * *************** */
const bcrypt = require('bcrypt')
const User = require('../../database/models/User')

module.exports = {
    // Method register
    register: (req, res) => {
        // Racourcie pour acceèder à la session
        const sess = req.session
        console.log(req.body)
        // ici on compare les 2 mot de passe
        if (req.body.password !== req.body.passwordConfirm) {
            console.log('error password')
            res.render('home', {
                error: 'Nous rencontrons un problèmes avec votre mot de passe !',
                sess: sess
            })
        } else {
            // ON log si la function est OK
            console.log('password OK')
            // On demande la function de Mongo pour créé notre utilisateur
            User.create({
                // On récupère notre formulaire
                ...req.body,
                // Au cas ou une err survient en force
            }, (err, user) => {
                // Si il y a une err
                if (err) console.log(err)
                else {
                    // Redirection
                    res.render('home', {
                        success: 'Votre compte à bien été créé ;)',
                        sess: sess
                    })
                }
            })
        }
    },
    // Validation du login ( Conexion )
    login: (req, res) => {

        const { email, password } = req.body;

        User.findOne({email}, (error, user) => {

            console.log("LOG USER");
            console.log(user);
            
            if (user){
                bcrypt.compare(password, user.password, (error, same) => {
                   if(same){

                    console.log("LOG2");
                    console.log(user._id);

                    req.session.userId = user._id
                       res.redirect('/admin')
                   } 
                   else {
                       res.redirect('/')
                   }
                })

            } else {
                return res.redirect('/')
            }
        })
   

    },
    logout: (req, res) => {
      const sess = req.session
      req.session.destroy(() => {
        res.clearCookie('cookie-sess')
        console.log(req.session)
        res.redirect('/')
      })
    }
}