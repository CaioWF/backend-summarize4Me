const fileUpload = require('express-fileupload');

const saveFileLocally = (file, newName) => {
    let filePath = 'C:\\Users\\publi\\Downloads\\test\\' + newName + '.' + getFileExtension(file.name);

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