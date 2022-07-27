const fs = require("fs");
const env = require("dotenv");
env.config();

const toReplace = "REPLACE_PUBLIC_URL";
const replaceWith = process.env.PUBLIC_URL ?? ".";

const replaceFile = (fileToReadFrom, fileToWriteTo) => {
    if (!replaceWith) {
        console.warn(`process.env.PUBLIC_URL is undefined!!!`);
    }
    fs.readFile(fileToReadFrom, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Replacing ${toReplace} with '${replaceWith}' in ${fileToWriteTo}`);
        const newHtml = data.split(toReplace).join(replaceWith);
        try {
            fs.writeFileSync(fileToWriteTo, newHtml, "utf8");
        } catch (e) {
            console.error("error writing file", err);
        }
    });
}

const fixIndexHtml = () => {
    const indexFilePath = "./build/index.html";
    const indexCopyFilePath = "./build/index.copy.html";

    const copyIndex = () => {
        fs.copyFileSync(indexFilePath, indexCopyFilePath);
    }

    if (!fs.existsSync(indexCopyFilePath)) {
        copyIndex();
    }
    replaceFile(indexCopyFilePath, indexFilePath);
}

const replaceAllInFolder = (folderPath) => {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        if (file) {
            const path = folderPath + file;
            replaceFile(path, path);
        }
    }
}


fixIndexHtml();
replaceAllInFolder("./build/static/css/");
replaceAllInFolder("./build/static/js/");
replaceFile("./build/asset-manifest.json", "./build/asset-manifest.json")
