import axios from 'axios';
import Config from 'config';
import store from '../store';
import storage from 'store2';
import { notification } from 'antd';


notification.config({
    placement: 'bottomRight',
});

export default (obj) => {
    var p = new Promise((resolve, reject) => {
        axios({
            url: obj.url,
            baseURL: Config.apiUrl,
            method: obj.method ? obj.method : 'GET',
            params: obj.params,
            headers: {
                'x-access-token': storage.local('authorize')
            },
            data: obj.data,
            timeout: 20000
        }).then((response) => {
            if (obj.message) {
                notification.success({
                    message: '成功',
                    description: obj.message
                })
            }
            resolve(response.data)
        }).catch((err) => {
            var message = '';
            if (err.response) {
                err.response.data.messages.forEach(function (val) {
                    message += val
                }, this);
            } else {
                message = '访问时间过长，请稍后尝试'
            }
            notification.error({
                message: '错误',
                description: message
            });
            reject(err);
        });
    })
    return p;
}
