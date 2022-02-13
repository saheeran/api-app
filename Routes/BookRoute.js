const express = require("express");
const BookController = require("../Controller/BookController");
const BookRouter = express.Router();


BookRouter.post('/insertBooking', (req, res) => {
    BookController.addBooking(req,res) 
})
BookRouter.get('/getBookService', (req, res) => {
    BookController.getBookingInfo(req,res)
})

module.exports = BookRouter;