const Autor = require('../models/Autor');

const autorCtrl = {};

autorCtrl.getAutors = async(req, res) => {
    const autor = await Autor.find();
    res.json(autor);
}

autorCtrl.createAutor = async(req, res) => {
    if (req.body.name == 'Autor' || !req.body.name) { res.status(401).send('Autor requerido'); return false }
    const name = req.body.name;
    const autorAux = await Autor.findOne({ name });
    if (autorAux) return res.status(401).send('Autor repetido');

    const newAutor = new Autor({
        name: req.body.name,
        active: true
    });
    await newAutor.save();
    res.json(newAutor._id);
}

autorCtrl.getAutor = async(req, res) => {
    const autor = await Autor.findById(req.params.id);
    res.json(autor);
}
autorCtrl.activateAutor = async(req, res) => {
    const autor = await Autor.findById(req.params.id);
    autor.active = true;
    autor.save();
    res.json({ 'status': true });
}
autorCtrl.editAutor = async(req, res) => {
    const { id } = req.params;
    const autor = {
        name: req.body.name
    }
    var autorAux = await Autor.findById(id);
    console.log(autorAux);
    autorAux.name = autor.name;
    if (autorAux.name == '') return res.status(401).send('Nombre requerido');
    autorAux.save();
    res.json(id);
}

autorCtrl.deleteAutor = async(req, res) => {
    const autor = await Autor.findById(req.params.id);
    autor.active = false;
    autor.save();
    res.json({ 'status': true });
}

module.exports = autorCtrl;