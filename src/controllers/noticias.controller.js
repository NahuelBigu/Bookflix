const Noticia = require('../models/Noticia');

const noticiaCtrl = {};

noticiaCtrl.getNoticias = async(req, res) => {
    const noticias = await Noticia.find().sort({ createdAt: -1 });
    res.json(noticias);
}

noticiaCtrl.createNoticia = async(req, res) => {
    if (!req.body.title) { res.status(401).send('Titulo requerido'); return false }
    if (!req.body.text) { res.status(401).send('Texto requerido'); return false }
    if (!req.body.image) { res.status(401).send('Imagen requerido'); return false }

    const newNoticia = new Noticia({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        image: req.body.image,
        active: true
    })


    await newNoticia.save();
    res.json(newNoticia._id);
}

noticiaCtrl.getNoticia = async(req, res) => {
    const noticia = await Noticia.findById(req.params.id);
    res.json(noticia);
}
noticiaCtrl.activateNoticia = async(req, res) => {
    const noticia = await Noticia.findById(req.params.id);
    noticia.active = true;
    noticia.save();
    res.json({ 'status': true });
}
noticiaCtrl.editNoticia = async(req, res) => {
    const { id } = req.params;
    const noticia = {
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        image: req.body.image,
    }
    var noticiaAux = await Noticia.findById(id);
    console.log(noticiaAux);
    noticiaAux.title = noticia.title;
    if (noticiaAux.title == '') res.status(401).send('Titulo requerido');
    noticiaAux.text = noticia.text;
    if (noticiaAux.text == '') res.status(401).send('Texto requerido');
    noticiaAux.image = noticia.image;
    if (noticiaAux.image == '') res.status(401).send('Imagen requerido');
    noticiaAux.save();
    res.json(id);
}

noticiaCtrl.deleteNoticia = async(req, res) => {
    const noticia = await Noticia.findById(req.params.id);
    noticia.active = false;
    noticia.save();
    res.json({ 'status': true });
}

module.exports = noticiaCtrl;