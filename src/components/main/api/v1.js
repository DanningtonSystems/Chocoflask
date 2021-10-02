const chalk = require("chalk");
const fs = require("fs"); 
const path = require("path");
const express = require("express");
const api = express.Router();

function uniqueFn(file) {
    let fExt = file.name.split(".");
    fExt = fExt[fExt.length - 1];
    let fn = process.random(process.configuration.cde.api.generatedFileNameLength);
    if (fs.existsSync(path.join(process.filePath + `/${fn.trim()}`))) {
        return uniqueFn(file);
    }
    return { nameExt: `${fn.trim()}.${fExt.trim()}`, name: fn, ext: fExt.trim() };
};

api.post("/upload", function (req, res, next) {
    res.header("Content-Type", "application/json");
    if (!req.headers["x-chocoflask-token"]) {
        console.log(`${chalk.blue("[API AUTH]")} ${chalk.yellow("[/api/v1/upload]")} ${chalk.red(`A request was sent to Chocoflask but no authentication header was supplied`)}`);
        return res.status(401).send({ status: 401, response: "Unauthorized (X-Chocoflask-Token header missing)" });
    };
    let key = req.headers["x-chocoflask-token"];
    if (key !== process.configuration.cde.api.token) {
        console.log(`${chalk.blue("[API AUTH]")} ${chalk.yellow("[/api/v1/upload]")} ${chalk.red(`An upload request was sent to Chocoflask with an invalid token (token ${key.substr(0, 3) + '...'})`)}`);
        return res.status(403).send({ status: 403, response: "Forbidden (X-Chocoflask-Token header invalid)" });
    };
    
    if (!req.files.chocoflask) {
        console.log(`${chalk.blue("[API]")} ${chalk.yellow("[/api/v1/upload]")} ${chalk.red(`No file was provided (token ${key.substr(0, 3) + '...'})`)}`);
        return res.status(400).send({ status: 400, response: "Bad Request (File form name should be \"chocoflask\")" });
    };
    
    const file = req.files.chocoflask;
    let generatedName = uniqueFn(file);
    let instanceURL = process.configuration.cde.url.trim();
    if (instanceURL.endsWith("/")) instanceURL = instanceURL.substr(0, instanceURL.length - 1);

    try {
        fs.writeFileSync(path.join(process.filePath + `/${generatedName.nameExt}`), file.data);
    } catch (e) {
        console.log(`${chalk.blue("[API]")} ${chalk.yellow("[/api/v1/upload]")} ${chalk.red(`An error occurred while writing the file to disk (token ${key.substr(0, 3) + '...'}):\n${e}`)}`);
        return res.status(500).send({ status: 500, response: "Internal Server Error (File could not be written)" });
    };

    console.log(`${chalk.blue("[API]")} ${chalk.yellow("[/api/v1/upload]")} ${chalk.green(`File ${generatedName.nameExt} uploaded successfully (token ${key.substr(0, 3) + '...'})`)}`);

    res.status(200).send({ status: 200, response: { url: `${instanceURL}/${generatedName.ext}/${generatedName.name}`, delete_url: `${instanceURL}/api/v1/delete?file=${generatedName.nameExt}` } });
});

module.exports = api;