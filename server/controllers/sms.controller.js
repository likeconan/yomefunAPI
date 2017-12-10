var BaseCtrl = require('./base.controller');


class SMSController extends BaseCtrl {
    constructor(lib) {
        super(lib);
        this.initalAction(lib);
    }
    initalAction(lib) {
        var config = lib.config;
        var helpers = lib.helpers;
        //Send SMS
        super.addAction({
            name: 'send_sms_ignore',
            path: '/sms',
            method: 'POST',
        }, (req, res, next) => {
            if (!helpers.ifMobile(req.params.to)) {
                res.send(400, { message: 'mobile_wrong' })
                next();
                return;
            }
            var num = Math.floor(Math.random() * 90000) + 10000;
            console.log(num)
            res.send({ code: num })
        });

    }
}

module.exports = SMSController