var BaseCtrl = require('./base.controller');
var jwt = require('jsonwebtoken');


class UserController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        // check if user isAuthorize
        super.addAction({
            name: 'user_authorize_ignore',
            path: '/users/authorize/:from',
            method: 'GET'
        }, (req, res, next) => {
            if (!req.params.from) {
                res.send(403, { message: 'no_login_from' })
                return next()
            }
            super.excuteDb({
                dbModel: 'users',
                method: 'findOne',
                object: {
                    where: {
                        uuid: req.decoded.data.loggedUserId
                    },
                    include: ['userInfos']
                },
            }).then((data) => {
                if (data && lib.helpers.loginRole(data.role, req.params.from)) {
                    super.excuteDb({
                        dbModel: 'users',
                        method: 'update',
                        object: {
                            lastLoginAt: new Date()
                        },
                        options: {
                            where: {
                                uuid: req.decoded.data.loggedUserId
                            }
                        }
                    })
                    res.send(data)
                    return next()
                } else {
                    res.send(403, { message: 'not_authorized' })
                }
            }).catch((err) => {
                res.send(400, err)
                return next()
            })
        })

        //Get users
        super.addAction({
            path: '/users',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'users',
                method: 'findAll',
                object: {
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            }).then((data) => {
                res.send(data);
                return next();
            }).catch((err) => {
                res.send(400, err)
                return next()
            })
        });


        //register user
        super.addAction({
            name: 'user_register_ignore',
            path: '/users',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'users',
                method: 'create',
                object: req.params
            }).then((data) => {
                res.send(data);
                return next();
            }).catch((err) => {
                res.send(400, err)
                return next()
            })
        })


        //login
        super.addAction({
            name: 'user_login_ignore',
            path: '/users/login/:from',
            method: 'GET'
        }, (req, res, next) => {
            if (!req.params.from) {
                res.send(403, { message: 'no_login_from' })
                return next()
            }
            if (!req.query.mobile || !req.query.password) {
                res.send(400, {
                    message: 'login_error'
                });
                return next();
            }
            super.excuteDb({
                dbModel: 'users',
                method: 'findOne',
                object: {
                    where: req.query,
                    attributes: {
                        exclude: ['password', 'registrationId']
                    },
                    include: ['userInfos']
                }
            }).then((data) => {
                if (data && lib.helpers.loginRole(data.role, req.params.from)) {
                    var token = jwt.sign({
                        data: {
                            isAuthorize: true,
                            loggedUserId: data.dataValues.uuid,
                        }
                    }, lib.config.secretKey, lib.config.expiresIn)

                    res.send({
                        token: token,
                        user: data.dataValues
                    });
                } else {
                    res.send(400, {
                        message: 'login_wrong'
                    })
                }
                return next();
            }).catch((err) => {
                res.send(400, err)
                return next()
            })
        })
    }
}

module.exports = UserController