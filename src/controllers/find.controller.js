const Autor = require('../models/Autor');
const Book = require('../models/Book');
const Editorial = require('../models/Editorial');
const Genero = require('../models/Genero');

const findCtrl = {};

findCtrl.getFind = async(req, res) => {
    const autor = await Autor.find().select('name');
    const genero = await Genero.find().select('name');
    const editoriales = await Editorial.find().select('name');
    const books = await Book.find().select('name');
    res.json({ books, autor, genero, editoriales });
}

findCtrl.search = async(req, res) => {
    const { find } = req.params;
    const autor = await Autor.find({ 'name': new RegExp(find, 'i') });
    const genero = await Genero.find({ 'name': new RegExp(find, 'i') });
    const editoriales = await Editorial.find({ 'name': new RegExp(find, 'i') });
    const booksAux = await Book.find();
    var books = [];
    booksAux.forEach(element => {
        if ((element.name.toUpperCase().indexOf(find.toUpperCase()) > -1) ||
            (autor.some((a) => element.author.toUpperCase() == a.name.toUpperCase())) ||
            (genero.some((g) => element.genre.toUpperCase() == g.name.toUpperCase())) ||
            (editoriales.some((e) => element.editorial.toUpperCase() == e.name.toUpperCase()))

        ) { books.push(element) }
    })
    res.json(books);
}

module.exports = findCtrl;