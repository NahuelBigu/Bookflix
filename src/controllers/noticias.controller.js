const Noticia = require('../models/Noticia');

const noticiaCtrl = {};

noticiaCtrl.getNoticias = async(req, res) => {
    const noticias = await Noticia.find();
    res.json(noticias);
}

noticiaCtrl.createNoticia = async(req, res) => {
    const newNoticia = new Book({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        image: req.body.image,
        active: true
    })
    await newNoticia.save();
    res.json({
        'status': true
    })
}

noticiaCtrl.getNoticia = async(req, res) => {
    const noticia = await Noticia.findById(req.body.id);
    res.json(noticia);
}

noticiaCtrl.editNoticia = async(req, res) => {
    const { id } = req.params;
    const noticia = {
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        image: req.body.image,
    }
    await noticia.findByIdAndUpdate(id, { $set: noticia }, { new: true });
    res.json({ 'status': true });
}

noticiaCtrl.deleteNoticia = async(req, res) => {
    await Noticia.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ 'status': true });
}

module.exports = noticiaCtrl;