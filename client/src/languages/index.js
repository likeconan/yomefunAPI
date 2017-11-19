import moment from 'moment';

class Lang {
    constructor(lang) {
        switch (lang) {
            case 'en':
                this.lang = require('./lang.en.js');
                break;
            case 'cn':
                this.lang = require('./lang.cn.js');
                break;

        }
    }
    instant = (prop) => {
        return prop && typeof prop === 'string' && this.lang[prop.toLowerCase()] ? this.lang[prop.toLowerCase()] : prop;
    }
}

export default new Lang('cn');