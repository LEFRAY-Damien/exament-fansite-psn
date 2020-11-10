// Import de Mongoose
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

// Config Mongoose
mongoose.connect(process.env.PORTMDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Connexion de Mongoose
mongoose.connection
  .once('open', (done) => console.log('mongoose connected! TEST MOCHA'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

// Supprime le contenu de article
beforeEach((done) => {
  mongoose.connection.collections.articles.drop(() => {
    done();
  });
});