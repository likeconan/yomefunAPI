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


        //log user search records
        super.addAction({
            path: '/search/records',
            method: 'POST'
        }, (req, res, next) => {
            super.excuteDb({
                dbModel: 'searchRecords',
                method: 'create',
                object: {
                    activityTypeUUID: req.params.activityTypeUUID,
                    userUUID: req.decoded.data.loggedUserId
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

module.exports = SearchRecordsController