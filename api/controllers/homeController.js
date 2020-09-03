module.exports = {
    get: (req, res) => {
        const title = 'Mon Super titre'
        const myArray = [
            {name: 'name 1', description: 'desxcrerg'},
            {name: 'name 2', description: 'desxcrerg'},
            {name: 'name 3', description: 'desxcrerg'},
            {name: 'name 4', description: 'desxcrerg'},
        ]
        console.log('get home')
        res.render('home', {
            success: "success",
            titre: title,
            tableau: myArray
        })
    }
}

// titre   a inscerer dans une page en {{ titre }}
// title   est = a la const title "ce qu'il y a a afficher dans la page"
// myArray   cree les nombre d'acction demander ici 4 avec "name" et "description"

// succes orange est envoyer a navbar.hbs