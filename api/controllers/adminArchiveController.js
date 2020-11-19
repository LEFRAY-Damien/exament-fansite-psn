// Import du model Archive de la base de donnée
const Archive = require("../../database/models/Archive"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images
const Links = require('../../database/models/Links');
const { link } = require("fs");

// Controllers
module.exports = {

    // POST................................
    postArchive: async (req, res) => {
        const file = req.file; // cree constante file pour cree l'image en webp

        const cover = {
            name: file.filename,
            originalName: file.originalname,
            //path: file.path.replace("public", "imageswebp"),
            //urlSharp: '/public/imageswebp/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
            createAt: Date.now(),
        }

        const dbLinks = await Links.find({})
        let linkArray = []

        console.log(req.body)
        console.log(dbLinks);

        Links.create({
            title: req.body.nomLink1,
            link: req.body.link1

        }, (err, data) => {
            if (err) console.log(err)
            linkArray.push(data._id)

            Archive.create({       // On cree l'article sur le model Article DB
                cover: cover,       // On enregistre le nom la provenance et la date de l'image
                ...req.body,       // suivant le req.body
                links: linkArray,
                imageArchive: `/assets/imagesArchives/${req.file.filename}` // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB

            }, (err, post) => {
                // Et on redirige sur la page /
                res.redirect('/admin')

            })
        })

    },

    // Edition Archive
    editArchive: async (req, res) => {

        const archiveID = await Archive.findById(req.params.id)
        query = { _id: req.params.id };

        // pathImg sera le chemin de notre fichier à supprimer
        pathImg = path.resolve("public/imagesArchives/" + archiveID.cover.name)

        // condition si il n'y a pas d'image dans le formulaire alors tu update sans image
        if (!req.file) {

            Archive.updateOne(query, {

                ...req.body,

            }, (err) => {
                res.redirect('/admin')
            })
        } else {

            const file = req.file; // cree constante file pour cree l'image

            // On cree le nom de l'image et son chemin
            const cover = {
                name: file.filename,
                originalName: file.originalname,
                createAt: Date.now(),
            }

            Archive.updateOne(query, {       // On cree l'article sur le model Article DB

                cover: cover,       // On enregistre le nom la provenance et la date de l'image

                ...req.body,       // suivant le req.body

                // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
                imageArchive: `/assets/imagesArchives/${req.file.filename}`,

            }, (err) => {

                if (err) console.log(err)

                // Si notre callback nous donne pas d'erreur alors note fonction de suppression de l'image de lance avec un callback d'err
                fs.unlink(pathImg, (err) => {
                    if (err) console.log(err)
                    //  Ici notre ancienne image viens d'etre supprimer
                    else res.redirect('/admin')

                })

            })
        }

    },

    // POST Lien populate Archive
    postArchiveLien: async (req, res, next) => {

        // On définit query comme un objet acceuillant notre req.params.id
        const query = {
            _id: req.params.id
        }

        // On définit nos Objet en relation avec notre carousel
        const archive = await Archive.findById(query)

        // On définit notre construction de lien
        const lien = new Links({

            ...req.body,
            articleID: archive._id,
            
        })

         // Ici on incrémente nos liens dans nos model en relation
         archive.lien.push(lien._id)

           // On sauvegarde nous modification
        lien.save((err) => {
            if (err) return handleError(err)
        })
        archive.save((err) => {
            if (err) return handleError(err)
        })

        // Et on redirige sur notre article parent
        res.redirect(`/admin`)     
    },
    
    // Delete Archive et Links populate
    deleteOne: async (req, res) => {
        // Ici une constante pour récupéré les liens lié a notre Archive
        const refliens = await Links.find({
            articleID: req.params.id
        })
        // Log pour checker
        // console.log(refComment)

        // Fonction de suppression d une Archive rechercher par son _id
        Archive.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on Continu
            if (!err) {
                // Ici on check si des commentaire sont lié à notre Article
                if (refliens) {
                    // Ici les commentaire lié à notre ID de notre Article seront supprimer
                    Links.deleteOne({
                        // On demande à récupéré tout nos Comment ayant comme articleID req.params.id (l'ID de l'article référant)
                        articleID: req.params.id
                        // Petit Callback en cas d'err
                    }, (err) => {
                        // Petit log de check
                        console.log('Les Commentaire on été supprimer');
                        // Si il n'y a pas d'err alors on redirige sur la page article
                        if (!err) return res.redirect('/admin')
                        // Sinon on renvoie l'err
                        else res.send(err)
                    })
                    // Si (sinon) notre article ne contient pas de commentaire alors
                } else return res.redirect('/admin')
            }
            // Sinon on renvoit l'err
            else res.send(err)
        })
    }

}

