var fs = require("fs");
var config = require("../lib/config");
var pool = require("../lib/db-pool");

function mergeConfigs(scriptDefault) {
    var name = null;
    var value = null;
    for(var f in scriptDefault) {
        if(scriptDefault.hasOwnProperty(f)) {
            name = f;
            value = scriptDefault[f];
        }
    }
    if(name != null && value != null) {
        if(config.scripts[name] == null) { config.scripts[name] = {}; }
        config.addDefaults(config.scripts[name], value);
        return name;
    }
}

function run() {
    var scripts = [];

    fs.readdir("./scripts", function(err, script) {
        var s = require("../scripts/" + script);
        var name = mergeConfigs(s.defaultConfig);
        s.init(config.scripts[name]);
        if(s.enabled) {
            console.log("Starting up script " + s.name);
            var exec = function () {
                s.run(pool);
                setTimeout(
                    function () {
                        exec();
                    },
                    s.interval
                );
            };
            exec();
            scripts.push(s);
        }
    });
}

module.exports = run;