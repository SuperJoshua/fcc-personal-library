"use strict"

// Considering the example given, here, this should have been the first project on the list. FCC left me hanging with what it actually expected of my tests.

// Not sure this pre-fab suite structure needs to be so explicit for the few tests given.

const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

suite("Functional Tests", function() {

   /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!

   test("#example Test GET /api/books", function(done) {
      chai.request(server)
      .get("/api/books")
      .end(function(err, res) {
         assert.equal(res.status, 200)
         assert.isArray(res.body, "response should be an array")
         assert.property(res.body[0], "commentcount", "Books in array should contain commentcount")
         assert.property(res.body[0], "title", "Books in array should contain title")
         assert.property(res.body[0], "_id", "Books in array should contain _id")
         done()
      })
   })

   * ----[END of EXAMPLE TEST]----
   */

   suite("Routing tests", function() {
      suite("POST /api/books with title => create book object/expect book object", function() {
         test("Test POST /api/books with title", function(done) {
            chai.request(server)
            .post("/api/books")
            .send({"title": "Book #1"})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.body.title, "Book #1")
               done()
            })
         })
         
         test("Test POST /api/books with no title given", function(done) {
            chai.request(server)
            .post("/api/books")
            .send({})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.text, "missing required field title")
               done()
            })
         })
      })

      suite("GET /api/books => array of books", function() {
         test("Test GET /api/books", function(done) {
            chai.request(server)
            .get("/api/books")
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.isArray(res.body)
               done()
            })
         })      
      })

      suite("GET /api/books/[id] => book object with [id]", function() {
         test("Test GET /api/books/[id] with id not in db", function(done) {
            chai.request(server)
            .get("/api/books/44")
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.text, "no book exists")
               done()
            })
         })
         test("Test GET /api/books/[id] with valid id in db", function(done) {
            chai.request(server)
            .get("/api/books/0")
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.body._id, "0")
               done()
            })
         })
      })

      suite("POST /api/books/[id] => add comment/expect book object with id", function() {
         test("Test POST /api/books/[id] with comment", function(done) {
            chai.request(server)
            .post("/api/books/0")
            .send({"id": "0", "comment": "Good book."})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.body._id, "0")
               assert.isArray(res.body.comments)
               assert.isTrue(res.body.comments.length > 0)
               done()
            })
         })

         test("Test POST /api/books/[id] without comment field", function(done) {
            chai.request(server)
            .post("/api/books/0")
            .send({"id": "0"})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.text, "missing required field comment")
               done()
            })
         })

         test("Test POST /api/books/[id] with comment, id not in db", function(done) {
            chai.request(server)
            .post("/api/books/44")
            .send({"id": "44", "comment": "Middling Book."})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.text, "no book exists")
               done()
            })
         })
      })

      suite("DELETE /api/books/[id] => delete book object id", function() {
         test("Test DELETE /api/books/[id] with valid id in db", function(done) {
            chai.request(server)
            .delete("/api/books/0")
            .send({"id": "0"})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.text, "delete successful")
               done()
            })
         })

         test("Test DELETE /api/books/[id] with id not in db", function(done) {
            chai.request(server)
            .delete("/api/books/44")
            .send({"id": "44"})
            .end(function(err, res) {
               assert.equal(res.status, 200)
               assert.equal(res.text, "no book exists")
               done()
            })
         })
      })
   })
})
