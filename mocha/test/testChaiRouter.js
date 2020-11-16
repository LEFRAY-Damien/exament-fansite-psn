// DB
const mongoose = require('mongoose');
const Article = require('../../database/models/Article')

// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const app = require('../../server');

chai.use(chaiHttp)

describe('CHAI // CONTROLLER //  ArticleController', () => {

  beforeEach((done) => {
    Article.deleteOne({}, (err) => {
      done();
    });
  });

  it(' ChaiRouter // Get Article', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      // .expect(200)
      .end((err, res) => {
        // console.log(res)
        if (err) return done(err)
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });

  it(' ChaiRouter // Post Article', (done) => {
    let article = {
      title: 'test Chai Post'
    }
    chai.request(app)
      .post('/admin/acceuil')
      .send(article)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });

  it(' ChaiRouter // Put Article', (done) => {
    let article = new Article({
      title: 'test Chai Edit'
    }),
      articleEdit = { title: 'test Chai Edit 2' }
    chai.request(app)
      .post('/admin/contact/' + article.id)
      .send(articleEdit)
      .end((err, res) => {
        res.should.be.a('object');
        done();
      });
  });

  it(' ChaiRouter // Delete Article', (done) => {
    let article = new Article({
      title: 'test Chai Delete'
    })
    chai.request(app)
      .delete('/admin/archive/' + article.id)
      .end((err, res) => {
        res.should.be.a('object');
        done();
      });
  });

});