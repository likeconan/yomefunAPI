class BaseController {
    constructor(lib) {
        this.actions = [];
        this.server = null;
        this.db = lib.db;
    }

    setUpActions(app) {
        this.server = app;
        for (let act of this.actions) {
            var method = act['spec']['method'];
            app[method.toLowerCase()]({
                name: act['spec']['name'],
                path: act['spec']['path']
            }, act['action']);
        }
    }
    addAction(spec, fn) {
        var newAct = {
            'spec': spec,
            action: fn,
        }
        this
            .actions
            .push(newAct)
    }

    excuteDb(spec) {
        var promise = new Promise((resolve, reject) => {
            try {
                var process = this.db[spec.dbModel][spec.method](spec.object);
                process.then((data) => {
                    resolve(data);
                }).catch((err) => {
                    var msg = 'unknown_error';
                    if (err.constructor.name === 'DatabaseError') {
                        msg = err.original.column + '_' + err.original.code
                    }
                    else if (err.constructor.name === 'UniqueConstraintError') {
                        msg = err.original.constraint + '_' + err.original.code
                    }
                    console.log(err)
                    reject(msg) //need to get the error message
                })
            } catch (error) {
                console.log(error);
                reject('internal_error')
            }
        })
        return promise;
    }
}

module.exports = BaseController;