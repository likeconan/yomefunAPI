var env = process.env.NODE_ENV || 'development';
var log4js = require('log4js');

log4js.configure({
    appenders: { yomefun: { type: 'file', filename: 'yomefun.log' } },
    categories: { default: { appenders: ['yomefun'], level: 'error' } }
});

const logger = log4js.getLogger('yomefun')

var lib = {
    config: require("../config/server.config")[env],
    controllers: require("../controllers"),
    helpers: require("./helpers"),
    db: require("../models"),
    logger: logger,
}

module.exports = lib