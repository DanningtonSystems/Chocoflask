const chalk = require("chalk");
const semver = require("semver");
let express = require("express");
let app = express();
app = process.app;


const api = require("./api/v1");
app.set("view engine", "ejs");

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

app.listen(process.config.network.port, process.config.network.interface, function() {
    console.log(chalk.green(`Chocoflask CDE core listening on ${process.config.network.interface}:${process.config.network.port}`));   
});