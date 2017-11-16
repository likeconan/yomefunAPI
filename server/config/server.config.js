var path = require('path')

module.exports = {
    development: {
        secretKey: 'secretKeyForYomefun',
        passwordKey: 'yomefun-password',
        expiresIn: {
            expiresIn: '365d'
        },
        server: {
            name: 'YomeFun API',
            version: '1.0.0',
            port: 9000,
        },
        filePath: path.dirname(path.dirname(__dirname)) + '/client/upload/',
        origins: ['http://localhost:3000'],
    },
    production: {
        secretKey: 'secretKeyForYomefun-prod',
        passwordKey: 'yomefun-password',
        expiresIn: {
            expiresIn: '365d'
        },
        server: {
            name: 'YomeFunAPI',
            version: '1.0.0',
            port: 9000,
        },
        filePath: "/app/upload/original",
        origins: ['http://yomefun.com', 'http://www.yomefun.com'],
    },
    test: {
        secretKey: 'test',
        passwordKey: 'secretKeyForYomefun-test',
        expiresIn: {
            expiresIn: '365d'
        },
        server: {
            name: 'YomeFunTestAPI',
            version: '1.0.0',
            port: 9191,
        },
        filePath: "/apptest/upload/original",
        origins: ['http://test.yomefun.com', 'http://www.test.yomefun.com'],
    },
}