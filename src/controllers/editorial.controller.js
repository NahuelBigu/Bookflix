const Editorial = require('../models/Editorial');

const editorialCtrl = {};

editorialCtrl.getEditoriales = async(req, res) => {
    const editoriales = await Editorial.find();
    res.json(editoriales);
}

editorialCtrl.createEditorial = async(req, res) => {
    if (req.body.name == 'Editorial' || !req.body.name) { res.status(401).send('Editorail requerida'); return false };
    const newEditorial = new Editorial({
        name: req.body.name,
        active: true
    });
    const name = req.body.name;
    const editorialAux = await Editorial.findOne({ name });
    if (editorialAux) return res.status(401).send('Editorial repetida');
    await newEditorial.save();
    res.json(newEditorial._id);
}

editorialCtrl.getEditorial = async(req, res) => {
    const editorial = await Editorial.findById(req.params.id);
    res.json(editorial);
}
editorialCtrl.activateEditorial = async(req, res) => {
    const editorial = await Editorial.findById(req.params.id);
    editorial.active = true;
    editorial.save();
    res.json({ 'status': true });
}
editorialCtrl.editEditorial = async(req, res) => {
    const { id } = req.params;
    const editorial = {
        name: req.body.name
    }
    var editorialAux = await Editorial.findById(id);

    editorialAux.name = autor.name;
    if (editorialAux.name == '') res.status(401).send('Nombre requerido');
    editorialAux.save();
    res.json(id);
}

editorialCtrl.deleteEditorial = async(req, res) => {
    const editorial = await Editorial.findById(req.params.id);
    editorial.active = false;
    editorial.save();
    res.json({ 'status': true });
}

module.exports = editorialCtrl;