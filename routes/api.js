"use strict"

// throwaway database
let db = {}
let db_index = 0

module.exports = function (app) {
   app.route("/api/books")
      .get(function (req, res){
         res.send(Object.values(db))
      })
      .post(function (req, res){
         const title = req.body.title
         if (!title) {res.send("missing required field title")}
         else {
            const _id = String(db_index)
            db_index += 1
            const comments = []
            const commentcount = 0
            db[_id] = {_id, title, commentcount, comments}
            res.send(db[_id])
         }
      })
      .delete(function(req, res){
         db = {}
         db_index = 0
         res.send("complete delete successful")
      })

   app.route("/api/books/:id")
      .get(function (req, res){
         const _id = req.params.id
         if (!db[_id]) {res.send("no book exists")}
         else {res.send(db[_id])}
      })
      .post(function(req, res){
         const _id = req.params.id
         const comment = req.body.comment
         if (!db[_id]) {res.send("no book exists")}
         else if (!comment) {res.send("missing required field comment")}
         else {
            db[_id].comments.push(comment)
            db[_id].commentcount += 1
            res.send(db[_id])
         }
      })
      .delete(function(req, res){
         const _id = req.params.id
         if (!db[_id]) {res.send("no book exists")}
         else {
            delete db[_id]
            res.send("delete successful")
         }
      }) 
}
