const fs = require('fs');
const formidable = require('formidable');

const saveFileLocally = (req) => {
    let form = new formidable.IncomingForm();
    let newFilePath = 'C:\\Users\\publi\\Downloads\\test\\';

    console.log(req.file);

    form.parse(req, (error, fields, files) => {
        let oldPath = files.file.path;
        newFilePath += files.file.name;

        fs.rename(oldPath, newFilePath, (err) => {
            if (err) throw err;
        });
    });

    return newFilePath;
};

module.exports = { saveFileLocally }