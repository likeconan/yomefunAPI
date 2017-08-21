var BaseCtrl = require('./base.controller');

class RecommendedController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        //Get all recommended data
        super.addAction({
            path: '/recommended',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'recommended',
                method: 'findAll',
                object: {
                    where: {
                        isAvailable: req.params.isAvailable
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
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
        });

        super.addAction({
            path: '/recommended',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'recommended',
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
        });

        super.addAction({
            path: '/recommended/:id',
            method: 'PUT'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'recommended',
                method: 'update',
                object: req.params,
                options: {
                    where: {
                        uuid: req.params.id
                    },
                    fields: ['title', 'activityTypeUUID', 'isAvailable', 'updatedAt']
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
        });
    }
}

module.exports = RecommendedController