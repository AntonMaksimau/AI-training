const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const directoryPath = '../Dataset/annotations';

function extractNameFromXML(filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error while reading file ${filePath}:`, err);
            return;
        }

        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(`Error during parsing file ${filePath}:`, err);
                return;
            }

            if (result.annotation && result.annotation.object) {
                result.annotation.object.forEach(obj => {
                    if (obj.name && obj.name[0]) {
                        console.log(`File: ${filePath}, Name: ${obj.name[0]}`);
                    }
                });
            }
        });
    });
}



