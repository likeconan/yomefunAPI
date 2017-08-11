var BaseCtrl = require('./base.controller');
var jwt = require('jsonwebtoken');

class UserController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

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
            }).catch((err_msg) => {
                res.send(500, {
                    message: err_msg
                })
                return next()
            })
        });

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
            }).catch((err_msg) => {
                res.send(400, {
                    message: err_msg
                })
                return next()
            })
        })

        super.addAction({
            name: 'user_login_ignore',
            path: '/users/login',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'users',
                method: 'findOne',
                object: {
                    where: req.params,
                    attributes: {
                        exclude: ['password', 'mobile', 'wechat']
                    }
                }
            }).then((data) => {
                res.send(data);
                return next();
            }).catch((err_msg) => {
                res.send(400, {
                    message: err_msg
                })
                return next()
            })
        })
    }
}

module.exports = UserController