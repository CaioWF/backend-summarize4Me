const fileUpload = require('express-fileupload');

const saveFileLocallyFromRequest = (file, newFileName) => {
    let filePath = 'C:\\Users\\publi\\Downloads\\test\\' + newFileName + '.' + getFileExtension(file.name);

    file.mv(filePath, (err) => {
        if (err)
            throw err;
    });

    return filePath;
};

const getFileExtension = (fileName) => {
    return fileName.split('.').pop();
}

module.exports = { saveFileLocallyFromRequest };