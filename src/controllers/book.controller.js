const Book = require('../models/Book');
var fs = require('fs');

const bookCtrl = {};

bookCtrl.getBooks = async(req, res) => {
    const books = await Book.find();
    res.json(books);
}

bookCtrl.getActiveBooks = async(req, res) => {
    const books = await Book.find();
    res.json(books.filter(function(x) { return (x.active && Date.parse(x.duedate) > (new Date)) }));
}

bookCtrl.createBook = async(req, res) => {
    if (!req.body.name) return res.status(401).send('Nombre requerido');
    if (!req.body.isbn) return res.status(401).send('ISBN requerido');
    const isbn = req.body.isbn
    const libroAux = await Book.findOne({ isbn: isbn });
    if (libroAux) return res.status(401).send('Libro duplicado');
    //if (!req.body.bookPDF) return res.status(401).send('PDF requerido');
    if (!req.body.author) return res.status(401).send('Author requerido');
    if (!req.body.genre) return res.status(401).send('Genero requerido');
    if (!req.body.editorial) return res.status(401).send('Editorial requerida');
    if (!req.body.image) return res.status(401).send('Imagen requerida');
    if (!req.body.maxChapters) return res.status(401).send('Cantidad de capitulos requerido');
    if (!req.body.duedate) return res.status(401).send('Fecha requerida');
    if (!req.body.synopsis) return res.status(401).send('Sinopsis requerido');
    var chaptersAux = String[req.body.maxChapters];
    if (!req.body.chapters) return res.status(401).send('Capitulos requeridos');
    const newBook = new Book({
        name: req.body.name,
        isbn: req.body.isbn,
        synopsis: req.body.synopsis,
        author: req.body.author,
        genre: req.body.genre,
        editorial: req.body.editorial,
        image: req.body.image,
        maxChapters: req.body.maxChapters,
        chapters: req.body.chapters,
        duedate: req.body.duedate,
        trailers: req.body.trailers,
        bookPDF: req.body.bookPDF,
        active: true,
        views: 0,
        comments: req.body.comments
    })
    await newBook.save();
    res.json({
        'status': 'book saved'
    })
}

bookCtrl.getBook = async(req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
}

bookCtrl.editBook = async(req, res) => {
    if (!req.body.name) return res.status(401).send('Nombre requerido');
    if (!req.body.isbn) return res.status(401).send('ISBN requerido');
    const isbn = req.body.isbn


    if (!req.body.author) return res.status(401).send('Author requerido');
    if (!req.body.genre) return res.status(401).send('Genero requerido');
    if (!req.body.editorial) return res.status(401).send('Editorial requerida');
    if (!req.body.image) return res.status(401).send('Imagen requerida');
    //if (!req.body.bookPDF) return res.status(401).send('Libro requerido');
    if (!req.body.synopsis) return res.status(401).send('Sinopsis requerido');

    const { id } = req.params;
    const book = await Book.findById(id);

    const libroAux = await Book.findOne({ "isbn": isbn });
    if ((libroAux != null) && !(libroAux._id.equals(book._id))) return res.status(401).send('Libro duplicado');

    book.name = req.body.name;

    book.synopsis = req.body.synopsis;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.editorial = req.body.editorial;
    book.image = req.body.image;
    book.bookPDF = req.body.bookPDF;
    book.duedate = req.body.duedate;
    book.trailers = req.body.trailers;

    if (book.isbn != req.body.isbn) {

        for (let index = 0; index < book.chapters.length; index++) {
            if (book.chapters[index] != "") {
                if (req.body.chapters[index] != "") {
                    fs.rename("src\\pdfs\\" + book.chapters[index], "src\\pdfs\\" + req.body.chapters[index], function(err) {
                        if (err) console.log('ERROR: ' + err);
                    })
                } else {
                    fs.unlinkSync("src\\pdfs\\" + book.chapters[index]);
                }
            }
        }
    }
    book.isbn = req.body.isbn;
    book.chapters = req.body.chapters;
    book.maxChapters = req.body.maxChapters;
    book.views = req.body.views;
    book.comments = req.body.comments;
    book.save();

    res.json({ 'status': 'book updeted' });
}

bookCtrl.deleteBook = async(req, res) => {

    const book = await Book.findById(req.params.id);
    book.active = false;
    book.save();
    res.json({ 'status': 'book deleted' });
}
bookCtrl.habilitarBook = async(req, res) => {

    const book = await Book.findById(req.params.id);
    book.active = true;
    book.save();
    res.json({ 'status': true });
}


bookCtrl.getSpecificBooks = async(req, res) => {
    const booksH = req.body;
    const books = await Book.find({ _id: { $in: booksH } })
    return res.json(books.filter(function(x) { return (x.active && Date.parse(x.duedate) > (new Date)) }));
}


bookCtrl.view = async(req, res) => {

    const book = await Book.findById(req.params.id);
    book.views = book.views + 1;
    book.save();
    res.json({ 'status': 'book view', 'views:': book.views  });
}
bookCtrl.unview = async(req, res) => {

    const book = await Book.findById(req.params.id);
    book.views = book.views - 1;
    book.save();
    res.json({ 'status': 'book unview' , 'views:': book.views });
}
module.exports = bookCtrl;