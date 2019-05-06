const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const inputFolder = 'images';
const outputFolder = 'resized';

fs.ensureDirSync(path.join(__dirname, outputFolder));

async function start() {
    const images = await fs.readdir(path.join(__dirname, inputFolder));

    await Promise.all(images.map(image => {
        return new Promise((resolve, reject) => {
            sharp(path.join(__dirname, inputFolder, image))
                .resize(150, 150)
                .toFile(path.join(__dirname, outputFolder, image), (err, info) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(info);
                    }
                });
        });
    }));
    console.log('Finished resizing images.');
}

start();
