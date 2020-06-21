const uploadCtrl = {};

uploadCtrl.uploadFile = async(req, res) => {
    res.json({
        'message' : 'file uploaded'
    });
}

module.exports = uploadCtrl;

