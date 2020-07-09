const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
//tambien de subir archivos ( :,C )
const multypart = require('connect-multiparty');
const upload = require('./controllers/upload.controller');
module.exports = app;

require('./database');

// settings
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'));
// middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/all', require('./routes/find.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/noticias', require('./routes/noticias.routes'));
app.use('/api/books', require('./routes/book.routes'));
app.use('/api/autors', require('./routes/autor.routes'));
app.use('/api/generos', require('./routes/genero.routes'));
app.use('/api/editoriales', require('./routes/editorial.routes'));
app.use('/api/planes', require('./routes/planes.routes'));


// subir archivos (no anda en otro lugar F)
const multipartMiddleware = multypart({
    uploadDir: './src/pdfs'
});
var fs = require('fs');
app.post('/api/upload', multipartMiddleware, (req, res, next) => {
    req.files.upload.forEach(e => {
        fs.rename(e.path, "src\\pdfs\\" + e.originalFilename, function(err) {
            if (err) console.log('ERROR: ' + err);
        })

    });
    res.json({
        'message': 'File uploaded succesfully.'
    })
});

app.get('/api/pdf/:name', function(req, res) {
    res.sendFile(path.join(__dirname, '/pdfs', req.params.name));

})



app.listen(app.get('port'));
console.log('Server on port', app.get('port'));

// Global Variables

// Initialization

// Static files
app.use(express.static(path.join(__dirname, 'public')));