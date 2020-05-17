const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
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
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/noticias', require('./routes/noticias.routes'));
app.use('/api/books', require('./routes/book.routes'));
app.use('/api/autors', require('./routes/autor.routes'));
app.use('/api/editoriales', require('./routes/editorial.routes'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));

// Global Variables

// Initialization

// Static files
app.use(express.static(path.join(__dirname, 'public')));