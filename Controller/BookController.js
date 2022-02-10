const BookService = require("../Service/BookService")

module.exports = {
    postBook: (req,res) => {
        BookService.inserBookService(req,res)
    }
}