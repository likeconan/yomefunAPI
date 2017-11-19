class BaseController {
    constructor(lib) {
        this.actions = [];
        this.server = null;
        this.logger = lib.logger;
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
                    this.logger.error(err.message)
                    reject({ message: msg }) //need to get the error message
                })
            } catch (error) {
                this.logger.error(error.message)
                reject(error)
            }
        })
        return promise;
    }

    getImages(files, obj) {
        var images = [];
        for (var key in files) {
            var file = files[key];
            var url = path.basename(file.path)
            images.push({
                url: url,
                path: file.path,
                imageType: 'original',
                from: obj.from,
                relatedId: obj.relatedId,
            });
        }
        return images
    }

    addImages(images) {
        return new Promise((resolve, reject) => {
            if (images.length > 0) {
                this.excuteDb({
                    dbModel: 'Images',
                    method: 'bulkCreate',
                    object: images
                }).then((data) => {
                    resolve(data)
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
            } else {
                resolve();
            }
        })
    }
}

module.exports = BaseController;