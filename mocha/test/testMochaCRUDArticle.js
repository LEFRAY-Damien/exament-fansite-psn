const assert = require('assert');
const Article = require('../../database/models/Article');

// On donne un nom à notre test
describe('Mocha // CRUD', () => {
  let article, dbArticle;

  // Cette boucle sert pour créé un Article a chaque 'it' qu'executera Mocha
  beforeEach((done) => {
    article = new Article({ title: 'test' });
    article.save()
      .then(() => done());
  });

  it('CRUD // CREATE 1 // Créé article title "test"', (done) => {

    const article = new Article({ title: 'test' });
        article.save()
            .then((art) => {
              assert(!article.isNew);
              done(console.log(art));
            });
  });

  it('CRUD // READ 1 // Article "test"', (done) => {
    Article.findOne({ title: 'test' })
      .then((article) => {
        assert(article.title === "test");
        done(console.log(article));
      })
      .catch((err) => console.log(err));
  })

  it('CRUD // READ 2 // Article "test" ID', (done) => {
    Article.findById({_id: article._id})
      .then((articleID) => {
        assert(articleID = {});
        done(console.log(articleID));
      });
  })

  // it('READ ALL // dbArticle []', (done) => {
  //   Article.find({})
  //     .then((db) => {
  //       assert(db);
  //       done(console.log(db));
  //     })
  //     .catch((err) => console.log(err));
  // })

  it('UPDATE // Article "test"', (done) => {
    Article.find({})
      .then((db) => {
        assert(db);
        done(console.log(db))
      })
      .catch((err) => console.log(err));
  })

  // it('CRUD // DELETE 1 // title "test"', (done) => {
  //   Article.deleteOne()
  //     .then(() => Article.findOne({ title: 'test' }))
  //     .then((art) => {
  //       assert(art = []);
  //       done(console.log(art));
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  // });

  // it('CRUD // DELETE ALL => title "test"', (done) => {
  //   Article.deleteMany({ title: 'test' })
  //     .then(() => Article.findOne({ title: 'test' }))
  //     .then((art) => {
  //       assert(art = []);
  //       done(console.log(art));
  //     })
  //     .catch((err) => {
  //       console.error("Handling promise rejection", err);
  //     });
  // });

  

});