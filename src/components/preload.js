const cors = require("cors");
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");
process.express = require("express");
process.pkg = require("../../package.json");
process.app = process.express();
process.config = require("../../Config.js");
process.app.use(cors());

// Credit: Сергей Дудко on Stack Overflow (9 June 2021); https://stackoverflow.com/questions/1349404/
process.random = function(length = 12) {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
    const rand = new Array(length).fill(null).map(() => charset.charAt(crypto.randomInt(charset.length))).join('');

    return rand;
};

try {
    fs.statSync(path.join(__dirname + `/../../files`)).isDirectory()
} catch (e) {
    fs.mkdirSync(path.join(__dirname + `/../../files`));
};

try {
    fs.statSync(path.join(__dirname + `/../../files/main`)).isDirectory()
} catch (e) {
    fs.mkdirSync(path.join(__dirname + `/../../files/main`));
};

try {
    fs.statSync(path.join(__dirname + `/../../files/misc`)).isDirectory()
} catch (e) {
    fs.mkdirSync(path.join(__dirname + `/../../files/misc`));
};

process.filePath = path.resolve(__dirname + "/../../files/main/");
process.dataPath = path.resolve(__dirname + "/../../files/misc/");