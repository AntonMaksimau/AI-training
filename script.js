const fs = require('fs').promises;
const xml2js = require('xml2js');
const path = require('path');

async function extractNameFromXML(filePath) {
    try {
        const data = await fs.readFile(filePath);
        const parser = new xml2js.Parser();

        return new Promise((resolve, reject) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    reject(`Error during parsing file ${filePath}: ${err}`);
                }

                if (result.annotation && result.annotation.object) {
                    for (const obj of result.annotation.object) {
                        if (obj.name && obj.name[0]) {
                            resolve(obj.name[0]);
                        }
                    }
                }

                resolve(null);
            });
        });
    } catch (err) {
        console.error(`Error while reading file ${filePath}: ${err}`);
    }
}

async function main() {
    for (let i = 0; i < 3686; i++) {
        const fileName = `Cats_Test${i}`;
        const fileImage = `${fileName}.jpg`;
        const filePath = path.join('../AI-training/Dataset/annotations', `${fileName}.xml`);

        try {
            const AnimalName = await extractNameFromXML(filePath);
            console.log(`${fileImage} - ${AnimalName}`);

            // AI Code

        } catch (err) {
            console.error(err);
        }
    }
}

main();

