const Autor = require('../models/Autor');
const Book = require('../models/Book');
const Editorial = require('../models/Editorial');
const Genero = require('../models/Genero');

const findCtrl = {};

findCtrl.getFind = async(req, res) => {
    var autor = await Autor.find().select('name');
    var genero = await Genero.find().select('name');
    var editoriales = await Editorial.find().select('name');
    var books = await Book.find()
    books = books.filter(function(x) { return (x.active && Date.parse(x.duedate) > (new Date)) })
    books = books.map(function(x) { return { "_id": x._id, "name": x.name } });

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
    books = books.filter(function(x) { return (x.active && Date.parse(x.duedate) > (new Date)) })
    res.json(books);
}

module.exports = findCtrl;