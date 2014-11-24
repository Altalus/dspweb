var defaults = {
    db: {
        connectionLimit : 10,
        database        : 'dspdb',
        host            : 'localhost',
        port            : 3306,
        user            : 'root',
        password        : ''
    },
    site: {
        name: "Guild Name",
        message: "Everyone remember where we parked!"
    },
    scripts: {},
    addDefaults: setDefaults
};

function setDefaults(config, defs) {
    for(var def in defs) {
        if(defs.hasOwnProperty(def)) {
            if(typeof(defs[def]) === "object") {
                if(config[def] == null) { config[def] = {}; }
                setDefaults(config[def], defs[def]);
            } else {
                if(config[def] == null) { config[def] = defs[def]; }
            }
        }
    }
}

function getConfig() {
    var conf;
    try {
        conf = require('../conf/config');
        setDefaults(conf, defaults);
    } catch(ex) {
        conf = defaults;
    }
    return conf;
}

module.exports = getConfig();