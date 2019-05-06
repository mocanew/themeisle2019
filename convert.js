const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const gifResize = require('gif-resize');

const inputFolder = 'images';
const outputFolder = 'resized';

fs.ensureDirSync(path.join(__dirname, outputFolder));

async function start() {
    const images = await fs.readdir(path.join(__dirname, inputFolder));

    await Promise.all(images.map(async image => {
        const imagePath = path.join(__dirname, inputFolder, image);

        if (image.endsWith('gif')) {
            const buffer = await fs.readFile(imagePath);

            const resizedGif = await gifResize({
                width: 150,
                height: 150,
            })(buffer);

            await fs.writeFile(path.join(__dirname, outputFolder, image), resizedGif);
        }
        else {
            return new Promise((resolve, reject) => {
                sharp(imagePath)
                    .resize(150, 150)
                    .toFormat(sharp.format.webp)
                    .toFile(path.join(__dirname, outputFolder, image.substr(0, image.lastIndexOf('.')) + '.webp'), (err, info) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(info);
                        }
                    });
            });
        }
    }));
    console.log('Finished resizing images.');
}

start();
