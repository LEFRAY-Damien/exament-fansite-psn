/*
 * On déclare nos constante
 * ************************ */

// import nodemailer 
const nodemailer = require('nodemailer'),
    // Déclaration ne notre transporter
    // C'est en quelque sorte notre connexion à notre boite mail
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: '587',
        auth: {
            user: "arratseantest@gmail.com",
            pass: process.env.PASSMAIL
            
        }
    })

// Ici on genere nos variable en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
var rand, mailOptions, host, link;

module.exports = {
    // Action test boite mail > nodemailer
    test: (req, res) => {
        console.log(req.body)
        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: 'arratseantest@gmail.com',
            to: req.body.email,
            subject: 'Félicitation, ' + req.body.author + ' !',
            html: `
        <h2>${req.body.author}, Ton premier mail avec nodemailer, Successfull !!</h2>
      `
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.redirect('home', {
                    success: "Un email à bien été envoyer à " + req.body.email
                })
            }
        })
    }
}