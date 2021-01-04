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
    login: async (req, res, next) => {
        console.log(req.body)
        // On défini la variable userAuth qui execute une fonction de MongoDB
        // Qui demande de recherché parmis le Model (User) une adresse mail
        // Qui serais correspondante avec le req.body.email
        // qui est notre formulaire d'authentification qui est sur la page /login
        let userAuth = await User.findOne({
            email: req.body.email
        });
        // Raccourcie pour la session
        const sess = req.session

        // Function primaire qui demande
        // Si userAuth ne correspond à aucun email dans la DB
        if (!userAuth) {
            // Log err
            console.log("pas ds la db");
            // Redirection sur home.hbs
            res.render('home', {
                error: "Ce compte n existe pas",
                sess: sess
            })
        // Sinon si userAuth est bien un mail qui éxiste dans la DB alors tu fais ça
        } else {
            // On défini que l'on va récupéré un Objet contenant email & password depuis req.body
            const {
                email,
                password
            } = req.body
            // On execute une fonction de MongoDB qui nous sert à allez récupéré l'objet complet
            // Qui correspond au mail de userAuth -> req.body.email
            User.findOne({
                email
            }, (error, User) => {
                if (error) console.log(error)
                // Si l'User ne correspond pas a un email concerné
                // Pour la sécurité c'est toujour mieux de géré les err avant la function réelle ;)
                if (!User) {
                    // Redirection sur home.hbs
                    res.render('home', {
                        error: "Ce compte n existe pas",
                        sess: sess
                    })
                // Sinon si notre req.body.email correspond avec un email éxistant
                // Alors tu me fais ça
                } else {
                    // L'on récupère le req.body.password
                    // On le passe dans la moulinette de notre module Bcrypt
                    // ce qu'il va faire est simple en gros :
                    // Il va hasher le req.body.password et il va comparer le hash avec celui qui est dans la DB
                    // Si les deux sont identique alors le password est OK
                    // On appelle cette function same on ajoute la function err qui va nous servir en cas d'err
                    // et on ouvre la function afin de réaliser notre authentification
                    bcrypt.compare(password, User.password, (error, same) => {
                        // Si le hash du req.body.password ne correspond pas avec le hash du password
                        // Correspondant avec l'email poster depuis req.body.email
                        // et bien tu me fais ça
                        if (!same) {
                            // Log OK
                            console.log('Error mdp')
                            // Redirection vers home.hbs
                            res.render('home', {
                                error: "Le mot de passe ne correspond pas !",
                                sess: sess
                            })
                        } else {
                            // Log Success Authentification OK
                            console.log('Success Authentification OK')

                            // Définition de la session
                            sess.email = User.email
                            sess.status = User.status
                            sess.pseudo = User.pseudo
                            sess.isVerified = User.isVerified
                            sess.imgUser = User.imgUser
                            sess.imgCover = User.imgCover
                            sess.userId = User._id
                            sess.isAdmin = User.isAdmin
                            sess.isModo = User.isModo
                            sess.bio = User.bio

                            // Redirection vers admin.hbs
                            res.render('admin', {
                                success: "vous etes connecter au nom de: " + User.pseudo,
                                sess: sess
                            })
                        }
                    })
                }
            })
        }
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