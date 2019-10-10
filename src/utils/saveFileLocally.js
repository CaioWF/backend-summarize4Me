const fileUpload = require('express-fileupload');

const saveFileLocallyFromRequest = (fileRequested, newName) => {
    let filePath = 'C:\\Users\\publi\\Downloads\\test\\' + newName + '.' + getFileExtension(fileRequested.name);

    file.mv(filePath, (err) => {
        if (err)
            throw err;
    });

    return filePath;
};

const getFileExtension = (fileName) => {
    return fileName.split('.').pop();
}

module.exports = { saveFileLocally }