const express = require("express");
const BookController = require("../Controller/BookController");
const BookRouter = express.Router();


BookRouter.get('/add', (req, res) => {
    BookController.postBook(req,res) 
})

module.exports = BookRouter;