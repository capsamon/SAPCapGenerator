"use strict";
const fs = require("fs");
module.exports = {
    readFileAsync: function (fileLocation) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileLocation, 'utf8', (err, data) => {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    },
    writeFileAsync: function (fileLocation, fileContent) {
        return new Promise((resolve, reject) => {
            fs.writeFile("/home/user/projects" + fileLocation, fileContent, 'utf8', (err, data) => {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    },
    makeDirectoryAsync: function (directoryLocation) {
        return new Promise((resolve, reject) => {
            fs.mkdir(directoryLocation, { recursive: true }, (err) => {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    }
};
