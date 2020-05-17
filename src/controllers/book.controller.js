const Book = require('../models/Book');

const bookCtrl = {};

bookCtrl.getBooks = async(req, res) => {
    const books = await Book.find();
    res.json(books);
}

bookCtrl.createBook = async(req, res) => {
    if (!req.body.name) return res.status(401).send('Nombre requerido');
    if (!req.body.synopsis) return res.status(401).send('Sinopsis requerido');
    if (!req.body.author) return res.status(401).send('Author requerido');
    if (!req.body.genre) return res.status(401).send('Genero requerido');
    if (!req.body.editorial) return res.status(401).send('Editorial requerida');
    if (!req.body.image) return res.status(401).send('Imagen requerida');
    if (!req.body.bookPDF) return res.status(401).send('Libro requerido');

    const newBook = new Book({
        name: req.body.name,
        synopsis: req.body.synopsis,
        author: req.body.author,
        genre: req.body.genre,
        editorial: req.body.editorial,
        image: req.body.image,
        bookPDF: req.body.bookPDF,
        active: true
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
    if (!req.body.synopsis) return res.status(401).send('Sinopsis requerido');
    if (!req.body.author) return res.status(401).send('Author requerido');
    if (!req.body.genre) return res.status(401).send('Genero requerido');
    if (!req.body.editorial) return res.status(401).send('Editorial requerida');
    if (!req.body.image) return res.status(401).send('Imagen requerida');
    if (!req.body.bookPDF) return res.status(401).send('Libro requerido');

    const { id } = req.params;
    const book = await Book.findById(id);

    book.name = req.body.name;
    book.synopsis = req.body.synopsis;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.editorial = req.body.editorial;
    book.image = req.body.image;
    book.bookPDF = req.body.bookPDF;

    book.save();

    res.json({ 'status': 'book updeted' });
}

bookCtrl.deleteBook = async(req, res) => {
    await Book.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ 'status': 'book deleted' });
}

module.exports = bookCtrl;