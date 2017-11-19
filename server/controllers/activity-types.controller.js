var BaseCtrl = require('./base.controller');

class ActivityTypesController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {

        //Get all activity types data
        super.addAction({
            path: '/activity/types',
            method: 'GET'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'activityTypes',
                method: 'findAll',
                object: {
                    where: {
                        isAvaliable: true
                    },
                    attributes: {
                        exclude: ['isAvaliable']
                    },
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

        super.addAction({
            path: '/activity/types',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'activityTypes',
                method: 'create',
                object: req.params
            }).then((data) => {
                res.send(data);
                return next();
            }).catch((err) => {
                res.send(400, err)
                return next()
            })
        });

    }
}

module.exports = ActivityTypesController