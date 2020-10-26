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
    editArchive: async (req, res) => {
        const archiveID = await Archive.findById(req.params.id)
        let linkArray = archiveID.links

        console.log(req.body)
        console.log(archiveID);

        if (!req.file) {
            Links.create({
                title: req.body.name,
                link: req.body.link

            }, (err, data) => {
                if (err) console.log(err)
                linkArray.push(data._id)
                console.log(linkArray)

                Archive.findByIdAndUpdate(req.params.id, {
                    links: linkArray,

                }, (err, post) => {
                    if (err) console.log(err)
                    res.redirect('/admin')

                })
            })
        } else {
            const file = req.file; // cree constante file pour cree l'image en webp

            const cover = {
                name: file.filename,
                originalName: file.originalname,
                //path: file.path.replace("public", "imageswebp"),
                //urlSharp: '/public/imageswebp/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
                createAt: Date.now(),
            }
            Links.create({
                title: req.body.name,
                link: req.body.link

            }, (err, data) => {
                if (err) console.log(err)
                linkArray.push(data._id)
                console.log(linkArray);

                Archive.findByIdAndUpdate({       // On cree l'article sur le model Article DB

                    cover: cover,       // On enregistre le nom la provenance et la date de l'image

                    ...req.body,       // suivant le req.body

                    links: linkArray,

                    // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
                    imageArchive: `/assets/imagesArchives/${req.file.filename}`,

                }, (err, post) => {

                    // Et on redirige sur la page /
                    res.redirect('/admin')
                })
            })
        }
    },
    deleteOne: (req, res) => {
        console.log('Delete One Links');
        console.log(req.params.id)
        Links.findByIdAndDelete(req.params.id, (err) => {
            if (err) console.log(err)
            res.end()
        })

    }

}

