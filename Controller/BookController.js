const BookService = require("../Service/BookService")

module.exports = {
    addBooking: (req,res) => {
        BookService.inserBookService(req,res)
    },
    getBookingInfo: (req,res) => {
        BookService.getBookInfo(req,res)
    }
}