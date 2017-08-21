var BaseCtrl = require('./base.controller');

class SearchRecordsController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        super.addAction({
            path: '/search/records',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'searchRecords',
                method: 'findAll',
                object: {
                    limit: 5,
                    offset: req.params.offset,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    where: {
                        activityTypeUUID: req.params.activityTypeUUID,
                        text: req.params.text
                    },
                    include: [
                        {
                            model: lib.db.users,
                            attributes: {
                                exclude: ['password', 'mobile', 'wechat']
                            }
                        }
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
            }).catch((err_msg) => {
                res.send(400, {
                    message: err_msg
                })
                return next()
            })
        })


        //login
        super.addAction({
            name: 'user_login_ignore',
            path: '/users/login',
            method: 'GET'
        }, (req, res, next) => {
            if (!req.params.mobile || !req.params.password) {
                res.send(400, {
                    message: 'login_error'
                });
                return next();
            }
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
                if (data) {
                    res.send(data);
                } else {
                    res.send(400, {
                        message: 'login_wrong'
                    })
                }
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

module.exports = SearchRecordsController