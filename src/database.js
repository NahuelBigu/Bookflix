const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/bookflix', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));