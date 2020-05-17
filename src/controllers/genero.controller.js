const Genero = require('../models/Genero');

const generoCtrl = {};

generoCtrl.getGeneros = async(req, res) => {
    const genero = await Genero.find();
    res.json(genero);
}

generoCtrl.createGenero = async(req, res) => {
    if (req.body.name=='Genero') { res.status(401).send('Genero requerido'); return false };
    const name=req.body.name;
    const generoAux = await Genero.findOne({ name });
    if (generoAux) return res.status(401).send('Genero repetido');

    const newGenero = new Genero({
        name: req.body.name,
        active: true
    })


    await newGenero.save();
    res.json(newGenero._id);
}

generoCtrl.getGenero = async(req, res) => {
    const genero = await Genero.findById(req.params.id);
    res.json(genero);
}
generoCtrl.activateGenero = async(req, res) => {
    const genero = await Genero.findById(req.params.id);
    genero.active = true;
    genero.save();
    res.json({ 'status': true });
}
generoCtrl.editGenero = async(req, res) => {
    const { id } = req.params;
    const genero = {
        name: req.body.name
    }
    var generoAux = await Genero.findById(id);
    console.log(generoAux);
    generoAux.name = genero.name;
    if (generoAux.name == '') res.status(401).send('Nombre requerido');
    generoAux.save();
    res.json(id);
}

generoCtrl.deleteGenero = async(req, res) => {
    const genero = await Genero.findById(req.params.id);
    genero.active = false;
    genero.save();
    res.json({ 'status': true });
}

module.exports = generoCtrl;