/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post("/api/books")
          .send({
            title: "testTitle"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body[0], "title", "Return object should contain title property");
            assert.property(res.body[0], "comments", "Return object should contain comments property");
            assert.property(res.body[0], "commentcount", "Return object should contain commentcount property");
            assert.isNumber(res.body[0].commentcount, "Property commentcount should be a number");
            assert.isArray(res.body[0].comments, "Property comments should be an array");
            assert.property(res.body[0], "_id", "Return object should contain _id property");
          });
        done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post("/api/books")
          .send({
            title: ""
          })
          .end((err, res) => {
            assert.equal(res.status, 300);
            assert.isString(res.body, "response should be a string");
            assert.equal(res.body, "missing required field title", "An error should appear");
          });
        done();
      });

    }); 

    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books', done => {
        chai.request(server)
          .get("/api/books")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            if(err) console.error(err);
          });
        done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get("/api/books/:id")
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, "response should be a string");
            assert.equal(res.body, "no book exists", "respose should be: no book exists");
          });
        done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get("/api/books/:id")
          .end((err, res) => {
            assert.equal(res.status, 200, "response status should be 200");
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'comments', 'Book should contain comments');
            assert.isArray(res.body.comments, 'Property comments should be an array');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Books should contain _id');
          });
        done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post("/api/books/:id")
          .send({
            _id: "66165abafd1e909ddb0f8d17", //to do
            comment: "test1comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            //to do
          });
        done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post("/api/books/:id")
          .send({
            _id: "66165abafd1e909ddb0f8d17", //to do
            comment: ""
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            //to do
          });
        done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post("/api/books/:id")
          .send({
            _id: "66165abafd1e909ddb0f8d17", //to do
            comment: "test1comment"
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            //to do
          });
        done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete("/api/books/:id")
          .send({
            _id: "66165abafd1e909ddb0f8d17", //to do
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            //to do
          });
        done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete("/api/books/:id")
          .send({
            _id: "66165abafd1e909ddb0f8d17", //to do
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            //to do
          });
        done();
      });

    }); 

  }); 

});
  