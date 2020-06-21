const multypart = require('connect-multiparty');

const multipartMiddleware = multypart({
    uploadDir: './pdfs'
});

module.exports = multipartMiddleware;