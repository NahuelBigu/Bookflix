const Book = require('../models/Book');

const bookCtrl = {};

bookCtrl.getBooks = async (req,res) => {
    const books = await Book.find();
    res.json(books);
}

bookCtrl.createBook = async (req,res) => {
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre,
        editorial: req.body.editorial,
        image: req.body.image,
        bookPDF: req.body.bookPDF
    })
    await newBook.save();
    res.json({
        'status' : 'book saved'
    })
}

bookCtrl.getBook = async (req,res) => {
    const book = await Book.findById(req.body.id);
    res.json(book);
}

bookCtrl.editBook = async (req,res) => {
    const { id } = req.params;
    const book = {
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre,
        editorial: req.body.editorial,
        image: req.body.image,
        bookPDF: req.body.bookPDF
    }
    await Book.findByIdAndUpdate(id, {$set: book}, {new: true});
    res.json({'status': 'book updeted'});
}

bookCtrl.deleteBook = async (req,res) =>{
    await Book.findByIdAndRemove(req.params.id);
    res.json({'status' : 'book deleted'});
}

module.exports = bookCtrl;