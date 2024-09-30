const fs = require("fs");
export default {
    readFileAsync(fileLocation: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(fileLocation, 'utf8', (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    },
    
    writeFileAsync: function(fileLocation: string, fileContent: string) {
        return new Promise((resolve, reject) => {
            fs.writeFile("/home/user/projects" + fileLocation, fileContent, 'utf8', (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    },

    makeDirectoryAsync: function(directoryLocation: string) {
        return new Promise((resolve, reject) => {
            fs.mkdir(directoryLocation, { recursive: true }, (err: any) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }
}