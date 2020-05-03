const express = require('express');
const cors = require('cors');
const app = express();

require('./database');

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// routes
app.use('/api', require('./routes/mainroutes'));
app.use('/api/books', require('./routes/book.routes'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));