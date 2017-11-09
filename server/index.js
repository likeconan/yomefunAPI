var restify = require('restify'),
    db = require('./models'),
    lib = require('./lib'),
    json = require('jsonwebtoken'),
    config = lib.config;

const corsMiddleware = require('restify-cors-middleware')

var server = restify.createServer(config.server);


const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: [],
    allowHeaders: ['api-access-token'],
    exposeHeaders: ['api-token-expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)


server.use(restify.plugins.queryParser({
    mapParams: true
}));

server.use(restify.plugins.bodyParser({
    maxBodySize: 1024 * 1024 * 20,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    keepExtensions: true,
    uploadDir: config.filePath,
    multiples: true,
    hash: 'sha1'
}));

/**
Validate each request, as long as there is a schema for it
*/

server.use(function (req, res, next) {
    json
        .verify(req.headers['api-access-token'], config.secretKey, function (err, decoded) {
            decoded = decoded ? decoded : {
                data: {
                    isAuthorize: false
                }
            }
            if (lib.helpers.excludeRoutes(req.route.name)) {
                req.decoded = decoded;
                return next();
            }
            if (err || !decoded.data.isAuthorize) {
                res.send(403, {
                    message: 'not_authorized'
                });
                return next(false);
            } else {
                req.decoded = decoded;
                return next();
            }
        })
})

lib
    .helpers
    .setupRoutes(server, lib)

server.listen(config.server.port, function () {
    console.log("YomeFunAPI started succesfully at port " + config.server.port + " in " + process.env.NODE_ENV)
})