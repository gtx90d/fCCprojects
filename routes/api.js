/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require("mongoose");

module.exports = function (app) {

  const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    comments: {
      type: [String],
      default: []
    },
    commentcount: {
      type: Number,
      default: 0
    }
  });

  const Book = new mongoose.model("Book", bookSchema);

  app.route('/api/books')
    .get(async (req, res) => {
      const getBooks = await Book.find({}, { __v: false, comments: false });
      const resultArray = [];
      getBooks.forEach(e => {
        const formattedObject = {
          title: e.title,
          _id: e._id,
          commentcount: e.commentcount
        };
        resultArray.push(formattedObject);
      });
      res.json(resultArray);
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post((req, res) => {
      let title = req.body.title;
      if(!title) return res.send("missing required field title");
      //response will contain new book object including atleast _id and title
      const newBook = new Book({
        title
      });
      newBook.save();
      res.json(newBook);
    })
    
    .delete(async (req, res) => {
      try {
        const result = await Book.deleteMany({});
       if(result.deletedCount > 0) res.send("complete delete successful");
      } catch(err) {
        console.error(err);
      }
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const selectedBook = await Book.findById(bookid, {
          title: true,
          _id: true,
          comments: true
        });
        if(selectedBook === null) return res.send("no book exists");
        res.json({
          title: selectedBook.title,
          _id: selectedBook._id,
          comments: selectedBook.comments
        });
      } catch {
        res.send("no book exists");
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment) return res.send("missing required field comment");
      try {
        const selectedBook = await Book.findById(bookid, { comments: true, commentcount: true });
        if(selectedBook === null) return res.send("no book exists");
        const commentBook = await Book.findByIdAndUpdate(bookid, {
          comments: [...selectedBook.comments, comment],
          commentcount: selectedBook.commentcount + 1
        }, { __v: false, new: true });
        res.json({
          title: commentBook.title,
          _id: commentBook._id,
          comments: commentBook.comments
        });
      } catch {
        res.send("no book exists");
      }
      //json res format same as .get
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      try {
        const deletedBook = await Book.findByIdAndDelete(bookid);
        if(deletedBook === null) return res.send("no book exists");
        res.send("delete successful");
      } catch {
        res.send("no book exists");
      }
      //if successful response will be 'delete successful'
    });
};
