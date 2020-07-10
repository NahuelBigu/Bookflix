const Comentario = require('../models/Comentario');

const comentarioCtrl = {};

comentarioCtrl.getComentarios = async (req, res) => {
    const comentarios = await Comentario.find();
    res.json(comentarios);
}

comentarioCtrl.createComentario = async (req, res) => {
    const newComment = new Comentario({
        like: req.body.like,
        texto: req.body.like,
        perfil: req.body.perfil,
        active: true
    });
    await newComment.save();
    res.json(newComment._id);
}

comentarioCtrl.getComentario = async (req, res) => {
    const comentario = await Comentario.findById(req.params.id);
    res.json(comentario);
}

comentarioCtrl.editComentario = async (req, res) => {
    const {id} = req.params;
    const comentario = await Comentario.findById(id);
    comentario.like = req.body.like;
    comentario.texto = req.body.texto;
    comentario.perfil = req.body.perfil;
    comentario.save();
    res.json({ 'status' : 'comment saved' });
}

comentarioCtrl.deleteComentario = async (req, res) => {
    const {id} = req.params;
    const comentario = await Comentario.findById(id);
    comentario.active = false;
    await comentario.save();
    res.json({ 'status' : 'comment deleted' });
}

module.exports = comentarioCtrl;