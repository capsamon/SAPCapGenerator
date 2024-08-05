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
            fs.writeFile(fileLocation, fileContent, 'utf8', (err, data) => {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    }
};
