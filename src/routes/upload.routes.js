const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload.controller');

const multypart = require('connect-multiparty');

const multipartMiddleware = multypart({
    uploadDir: './pdfs'
});


router.post('/', multipartMiddleware, upload.uploadFile);