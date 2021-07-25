const chalk = require("chalk");
const semver = require("semver");
const path = require("path");
const fs = require("fs");
const { DateTime } = require("luxon");
let express = require("express");
let app = express();
app = process.app;


const api = require("./api/v1");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/ejs"));

app.use(
    require("express-fileupload")({ 
        safeFileNames: true,
        preserveExtension: true,
        limits: {
            fileSize: (process.config.cde.api.uploadLimit) * 1024 * 1024
        }
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("X-Powered-By", `Express ${semver.clean(process.pkg.dependencies.express.trim().replace("^", ""))}`);
    next();
});

app.use("/api/v1", api);

app.get("/", function(req, res) {
    res.redirect(process.config.cde.web.redirect);
});

app.get("/:extension/:file", function(req, res, next) {
    let validImageExtensions = ["png", "jpg", "jpeg", "gif", "svg"];
    try {
        const stat = fs.statSync(path.join(process.filePath + `/${req.params.file}.${req.params.extension}`));
        const btdLuxon = DateTime.fromJSDate(stat.birthtime);
        const TimeLocale = DateTime.TIME_SIMPLE;
        TimeLocale.timeZone = "UTC";

        let instanceURL = process.config.cde.url.trim();
        if (instanceURL.endsWith("/")) instanceURL = instanceURL.substr(0, instanceURL.length - 1);

        if (validImageExtensions.includes(req.params.extension)) {
            res.render("image", { 
                backendURL: `${instanceURL}/backend/main/${req.params.file}.${req.params.extension}`,
                fileName: `${req.params.file}.${req.params.extension}`,
                birthtime: `${btdLuxon.toLocaleString(TimeLocale)} on ${btdLuxon.toLocaleString({ locale: "en-gb", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })} (GMT)`
             });
        } else {
            res.redirect(`${instanceURL}/backend/main/${req.params.file}.${req.params.extension}`);
        };

    } catch (e) {
        res.status(404);
        next();
    };
});

app.listen(process.config.network.port, process.config.network.interface, function() {
    console.log(chalk.green(`Chocoflask CDE core listening on ${process.config.network.interface}:${process.config.network.port}`));   
});