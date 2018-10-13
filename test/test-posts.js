//test/test-posts.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Post = require('../models/post');

chai.use(chaiHttp);

const samplePost = {
    "title": "Insert Cool Story Here",
    "description": "A cool story."
}

// tell mocha you want to test Reviews
describe('Posts', ()  => {

    after(() => {
        Post.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
          console.log(reviews)
          reviews.remove();
        })
     });

  // TEST INDEX

  //make name for the test
  it('should index ALL reviews on / GET', (done) => {
    // use chai-http to make a request to your server
    chai.request(server)
        //sends GET request to root route
        .get('/')
        //wait for response
        .end((err, res) => {
          //checks that status is 200 (success)
          res.should.have.status(200);
          //response type should be html
          res.should.be.html;
          //end test
          done();
        });
  });

  // TEST NEW

  it('Should return a new post form on /posts/new GET', (done) => {
      chai.request(server)
        .get(`/posts/new`)
        .end((err, res) => {
            res.should.have.status(200)
            res.should.be.html
            done()
        })
  })

  // TEST CREATE

  it('should create a single new post on /posts POST', (done) => {
      chai.request(server)
          .post("/posts")
          .send(samplePost)
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.html
              done()
          })
  })

  // TEST SHOW

  it('should show a single post on /posts/<id> GET', (done) => {
      var aSamplePost = new Post(samplePost)
      aSamplePost.save((err, data) => {
          chai.request(server)
              .get(`/posts/${data._id}`)
              .end((err, res) => {
                  res.should.have.status(200)
                  res.should.be.html
                  done()
              })
      })
  })

  // TEST EDIT

  it('should edit a single post on /posts/<id> GET', (done) => {
  var aSamplePost = new Post(samplePost)
    aSamplePost.save((err, data) => {
      chai.request(server)
          .get(`/posts/${data._id}/edit`)
          .end((err, res) => {
              res.should.have.status(200)
              res.should.be.html
              done()
          })
     })
   })

  // TEST UPDATE

  it('should update a single post on /posts/<id> PUT', (done) => {
      var aSamplePost = new Post(samplePost)
      aSamplePost.save((err, data) => {
          chai.request(server)
            .put(`/posts/${data._id}?_method=PUT`)
            .send({'title': 'Updating title'})
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
      })
  })
  // TEST DELETE

  it('should delete a single post from /posts/<id> DELETE', (done) => {
      var aSamplePost = new Post(samplePost)
      aSamplePost.save((err, data) => {
          chai.request(server)
            .delete(`/posts/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
      })
  })
});
